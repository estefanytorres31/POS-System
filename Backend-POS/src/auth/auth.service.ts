import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';
import { UsuarioService } from '../usuario/usuario.service.js';
import { MailService } from '../mail/mail.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
    private mailService: MailService,
  ) {}

  async login(loginDto: LoginDto) {

    const usuario = await this.prisma.usuario.findUnique({
      where: { email: loginDto.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Nombre de usuario o contraseña incorrectos');
    }

    if (usuario.deletedAt === null && usuario.estado === false) {
      throw new UnauthorizedException('La cuenta está eliminada permanentemente');
    }

    const isMatch = await bcrypt.compare(loginDto.password, usuario.password);
    if (!isMatch) {
      throw new UnauthorizedException('Nombre de usuario o contraseña incorrectos');
    }

    // Borrar sesiones previas del usuario (Lógica del original)
    await this.prisma.sesion.deleteMany({
      where: { usuarioId: usuario.id },
    });

    const payload = {
      id: usuario.id,
      email: usuario.email,
      nombreNegocio: usuario.nombreNegocio,
      rol: usuario.rol,
    };
    
    const token = this.jwtService.sign(payload);

    const expiracion = new Date();
    expiracion.setHours(expiracion.getHours() + 24);

    await this.prisma.sesion.create({
      data: {
        usuarioId: usuario.id,
        token,
        expiracion,
        puntoDeVentaId: usuario.puntoDeVentaId || 0, // Fallback if no POS
      },
    });

    return {
      usuarioId: usuario.id,
      token,
      nombreNegocio: usuario.nombreNegocio,
      rol: usuario.rol,
    };
  }

  async logout(token: string) {
    const decoded: any = this.jwtService.decode(token);
    if (decoded && decoded.id) {
      await this.prisma.sesion.deleteMany({
        where: {
          usuarioId: decoded.id,
          token,
        },
      });
    }
    return { message: 'Sesión cerrada exitosamente' };
  }

  async forgotPassword(email: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Correo no encontrado');
    }

    // Generar un token con 1 hora de expiracion
    const payload = { usuarioId: usuario.id, email: usuario.email };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    const expiracion = new Date();
    expiracion.setHours(expiracion.getHours() + 1);

    await this.prisma.resetToken.create({
      data: {
        token,
        expiracion,
        usuarioId: usuario.id,
      },
    });

    // Cambiar scheme según ambiente
    const resetLink = `http://localhost:3000/cambiar?token=${token}`;
    await this.mailService.enviarCorreoCambioPass(email, usuario.nombre, resetLink);

    return { message: 'Correo de recuperación enviado' };
  }

  async resetPassword(token: string, newPassword: string) {
    let decoded: any;
    try {
      decoded = this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('El token no es válido o ha expirado');
    }

    const resetToken = await this.prisma.resetToken.findFirst({
      where: { token },
    });

    if (!resetToken) {
      throw new UnauthorizedException('El token no es válido o ha expirado');
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: { id: resetToken.usuarioId },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.usuario.update({
      where: { id: resetToken.usuarioId },
      data: { password: hashedNewPassword },
    });

    await this.prisma.resetToken.deleteMany({
      where: { usuarioId: resetToken.usuarioId },
    });

    // Logout all active sessions for this user
    await this.prisma.sesion.deleteMany({
      where: {
        usuarioId: usuario.id,
        expiracion: { gt: new Date() },
      },
    });

    return { message: 'Contraseña actualizada correctamente' };
  }
}


