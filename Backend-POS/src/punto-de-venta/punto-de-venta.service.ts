import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePuntoDeVentaDto } from './dto/create-punto-de-venta.dto.js';
import { UpdatePuntoDeVentaDto } from './dto/update-punto-de-venta.dto.js';

@Injectable()
export class PuntoDeVentaService {
  constructor(private prisma: PrismaService) {}

  async crear(createDto: CreatePuntoDeVentaDto) {
    return this.prisma.puntoDeVenta.create({
      data: {
        nombre: createDto.nombre,
        propietario: createDto.propietario,
        estado: createDto.estado,
        fecha_creacion: new Date(),
      },
    });
  }

  async listar() {
    return this.prisma.puntoDeVenta.findMany();
  }

  async obtenerPorId(id: number) {
    const pos = await this.prisma.puntoDeVenta.findUnique({ where: { id } });
    if (!pos) throw new NotFoundException('Punto de venta no encontrado');
    return pos;
  }

  async editar(id: number, updateDto: UpdatePuntoDeVentaDto) {
    await this.obtenerPorId(id);
    return this.prisma.puntoDeVenta.update({
      where: { id },
      data: { ...updateDto },
    });
  }

  async eliminar(id: number) {
    await this.obtenerPorId(id);
    return this.prisma.puntoDeVenta.delete({ where: { id } });
  }

  // Removed obtenerPorCodigo since codigo_acceso does not exist in schema
}
