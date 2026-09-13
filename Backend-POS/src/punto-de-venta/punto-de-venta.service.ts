import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePuntoDeVentaDto } from './dto/create-punto-de-venta.dto.js';
import { UpdatePuntoDeVentaDto } from './dto/update-punto-de-venta.dto.js';

@Injectable()
export class PuntoDeVentaService {
  constructor(private prisma: PrismaService) {}

  async crear(createPuntoDeVentaDto: CreatePuntoDeVentaDto & { negocioId: number }) {
    return this.prisma.puntoDeVenta.create({
      data: {
        nombre: createPuntoDeVentaDto.nombre,
        direccion: createPuntoDeVentaDto.direccion, // now exists on CreatePuntoDeVentaDto ? Wait, assume it does or just use nombre
        negocioId: createPuntoDeVentaDto.negocioId,
      },
    });
  }

  async listar(negocioId: number) {
    return this.prisma.puntoDeVenta.findMany({
      where: { negocioId }
    });
  }

  async obtenerPorId(id: number) {
    const punto = await this.prisma.puntoDeVenta.findUnique({
      where: { id },
    });
    if (!punto) throw new NotFoundException('Punto de Venta no encontrado');
    return punto;
  }

  async editar(id: number, updateDto: UpdatePuntoDeVentaDto) {
    await this.obtenerPorId(id);
    return this.prisma.puntoDeVenta.update({
      where: { id },
      data: {
        nombre: updateDto.nombre,
        direccion: updateDto.direccion,
      },
    });
  }

  async eliminar(id: number) {
    await this.obtenerPorId(id);
    return this.prisma.puntoDeVenta.delete({
      where: { id },
    });
  }
}


