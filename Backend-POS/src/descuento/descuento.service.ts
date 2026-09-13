import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDescuentoDto } from './dto/create-descuento.dto.js';
import { UpdateDescuentoDto } from './dto/update-descuento.dto.js';

@Injectable()
export class DescuentoService {
  constructor(private prisma: PrismaService) {}

  async crear(createDescuentoDto: CreateDescuentoDto) {
    return this.prisma.descuento.create({
      data: createDescuentoDto,
    });
  }

  async listar(negocioId: number) {
    return this.prisma.descuento.findMany({
      where: { negocioId },
    });
  }

  async obtenerPorId(id: number) {
    const descuento = await this.prisma.descuento.findUnique({ where: { id } });
    if (!descuento) throw new NotFoundException('Descuento no encontrado');
    return descuento;
  }

  async editar(id: number, updateDescuentoDto: UpdateDescuentoDto) {
    await this.obtenerPorId(id);
    return this.prisma.descuento.update({
      where: { id },
      data: updateDescuentoDto,
    });
  }

  async eliminar(id: number) {
    await this.obtenerPorId(id);
    return this.prisma.descuento.delete({ where: { id } });
  }
}



