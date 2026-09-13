import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateImpuestoDto } from './dto/create-impuesto.dto.js';
import { UpdateImpuestoDto } from './dto/update-impuesto.dto.js';

@Injectable()
export class ImpuestoService {
  constructor(private prisma: PrismaService) {}

  async crear(createImpuestoDto: CreateImpuestoDto) {
    return this.prisma.impuesto.create({
      data: createImpuestoDto,
    });
  }

  async listar(negocioId: number) {
    return this.prisma.impuesto.findMany({
      where: { negocioId },
    });
  }

  async obtenerPorId(id: number) {
    const impuesto = await this.prisma.impuesto.findUnique({ where: { id } });
    if (!impuesto) throw new NotFoundException('Impuesto no encontrado');
    return impuesto;
  }

  async editar(id: number, updateImpuestoDto: UpdateImpuestoDto) {
    await this.obtenerPorId(id);
    return this.prisma.impuesto.update({
      where: { id },
      data: updateImpuestoDto,
    });
  }

  async eliminar(id: number) {
    await this.obtenerPorId(id);
    return this.prisma.impuesto.delete({ where: { id } });
  }
}



