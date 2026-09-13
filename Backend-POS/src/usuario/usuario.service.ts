import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { MailService } from '../mail/mail.service.js';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UsuarioService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async crearPropietario(createDto: CreateUsuarioDto) {
    const usuariosExistentes = await this.prisma.usuario.count();

    let rolAsignado: 'Admin' | 'Propietario' = 'Propietario';
    if (usuariosExistentes === 0) {
      rolAsignado = 'Admin';
    } else {
      // Logic for Negocio
      if (createDto.nombreNegocio) {
        const nuevoNegocio = await this.prisma.negocio.create({
          data: {
            nombre: createDto.nombreNegocio,
            createdAt: new Date(),
            estado: true,
            estadoSuscripcion: 'Activa',
          },
        });
        
        // Creamos una sucursal por defecto para el negocio
        await this.prisma.puntoDeVenta.create({
          data: {
            nombre: 'Sede Principal',
            negocioId: nuevoNegocio.id,
          }
        });
      }
    }

    const negocio = createDto.nombreNegocio
      ? await this.prisma.negocio.findFirst({
          where: { nombre: createDto.nombreNegocio },
          orderBy: { id: 'desc' },
        })
      : null;

    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    return this.prisma.usuario.create({
      data: {
        nombre: createDto.nombre,
        email: createDto.email,
        ciudadId: createDto.ciudadId,
        direccion: createDto.direccion,
        codigoPostal: createDto.codigo_postal,
        password: hashedPassword,
        nombreNegocio: createDto.nombreNegocio,
        rol: rolAsignado,
        telefono: createDto.telefono,
        cargo: 'Gerente',
        estado: true,
        createdAt: new Date(),
        negocioId: negocio ? negocio.id : undefined,
      },
    });
  }

  async crearEmpleado(createDto: CreateUsuarioDto, propietarioidNegocio: number) {
    if (createDto.rol !== 'Empleado') {
      throw new BadRequestException('El rol debe ser Empleado');
    }

    const existingUser = await this.prisma.usuario.findUnique({
      where: { email: createDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('El correo ya está en uso');
    }

    const plainPassword = createDto.password; // The password to send in email
    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    const newUser = await this.prisma.usuario.create({
      data: {
        nombre: createDto.nombre,
        email: createDto.email,
        cargo: createDto.cargo,
        telefono: createDto.telefono,
        password: hashedPassword,
        ciudadId: createDto.ciudadId,
        direccion: createDto.direccion,
        codigoPostal: createDto.codigo_postal,
        rol: 'Empleado',
        negocioId: propietarioidNegocio,
        estado: true,
        createdAt: new Date(),
      },
    });

    const loginUrl = 'http://localhost:3000/login'; // Adjust to real domain
    await this.mailService.enviarCorreoBienvenida(
      newUser.email,
      newUser.nombre,
      plainPassword,
      loginUrl
    );

    return newUser;
  }

  async listarEmpleados(idNegocio: number) {
    return this.prisma.usuario.findMany({
      where: {
        rol: 'Empleado',
        estado: true,
        negocioId: idNegocio,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        cargo: true,
        telefono: true,
        estado: true,
        createdAt: true,
      },
    });
  }

  async buscarUsuarioPorId(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!usuario) {
      throw new NotFoundException(`No se encontró ningún usuario con el ID ${id}`);
    }
    return usuario;
  }

  async editarUsuarioPorId(id: number, updateDto: UpdateUsuarioDto) {
    const usuarioExistente = await this.buscarUsuarioPorId(id);
    const updatedUsuario = await this.prisma.usuario.update({
      where: { id },
      data: {
        ...updateDto,
        password: updateDto.password
          ? await bcrypt.hash(updateDto.password, 10)
          : undefined,
        updatedAt: new Date(),
      },
    });

    // The propietario field was removed from the schema.
    // Negocios simply contain Propietarios via the negocioId relationship.

    return updatedUsuario;
  }

  async listarUsuarios() {
    return this.prisma.usuario.findMany({
      where: { estado: true, rol: 'Propietario' },
    });
  }

  // TODO: Add the rest of the methods (eliminarTemporalmente, restaurarCuenta, etc.)

  async cambiarContrasena(id: number, contrasenaActual: string, nuevaContrasena: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const match = await bcrypt.compare(contrasenaActual, usuario.password);
    if (!match) throw new BadRequestException('Contraseña actual incorrecta');

    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    await this.prisma.usuario.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return { message: 'Contraseña actualizada correctamente' };
  }

  async eliminarTemporalmente(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    if (!usuario.estado && usuario.deletedAt) {
      throw new BadRequestException('La cuenta ya está eliminada temporalmente');
    }

    const res = await this.prisma.usuario.update({
      where: { id },
      data: {
        estado: false,
        deletedAt: new Date(),
      },
    });

    // Enviar correo
    await this.mailService.enviarCorreoEliminacionTemporal(usuario.email, usuario.nombre);

    // Logout all active sessions for this user
    await this.prisma.sesion.deleteMany({
      where: { usuarioId: id },
    });

    return res;
  }

  async restaurarCuenta(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    
    if (usuario.deletedAt !== null) {
      const unaSemana = 7 * 24 * 60 * 60 * 1000;
      const fechaEliminacion = new Date(usuario.deletedAt).getTime();

      if (Date.now() - fechaEliminacion <= unaSemana) {
        await this.prisma.usuario.update({
          where: { id },
          data: { estado: true, deletedAt: null },
        });

        await this.mailService.enviarCorreoRestauracion(usuario.email, usuario.nombre);
        return { message: 'Cuenta restaurada exitosamente' };
      } else {
        throw new BadRequestException('El tiempo de gracia para restaurar la cuenta ha expirado');
      }
    } else {
      throw new BadRequestException('La cuenta no está en estado de eliminación temporal');
    }
  }

  async eliminarPermanentemente(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    await this.prisma.sesion.deleteMany({
      where: { usuarioId: id },
    });

    await this.mailService.enviarCorreoEliminacionPermanente(usuario.email, usuario.nombre);

    const res = await this.prisma.usuario.update({
      where: { id },
      data: { estado: false, deletedAt: null }, 
    });

    return res;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async eliminarCuentasVencidasYTokensExpirados() {
    const fechaUnaSemanaAtras = new Date();
    fechaUnaSemanaAtras.setDate(fechaUnaSemanaAtras.getDate() - 7);

    // Eliminar permanentemente los usuarios que pasaron 7 días en estado inactivo
    await this.prisma.usuario.deleteMany({
      where: {
        estado: false,
        deletedAt: { lte: fechaUnaSemanaAtras },
      },
    });

    // Eliminar tokens de reseteo expirados
    await this.prisma.resetToken.deleteMany({
      where: { expiracion: { lt: new Date() } },
    });

    // Eliminar sesiones expiradas
    await this.prisma.sesion.deleteMany({
      where: { expiracion: { lt: new Date() } },
    });
  }
}
