import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class NegocioService {
  constructor(private prisma: PrismaService) {}

  async crear(data: any) {
    return this.prisma.negocio.create({
      data: {
        ...data,
        createdAt: new Date(),
        estado: true,
      },
    });
  }

  async listar() {
    return this.prisma.negocio.findMany({
      include: { ciudad: { include: { provincia: { include: { pais: true } } } } }
    });
  }

  async obtenerPorId(id: number) {
    const negocio = await this.prisma.negocio.findUnique({
      where: { id },
      include: { ciudad: { include: { provincia: { include: { pais: true } } } } }
    });
    if (!negocio) throw new NotFoundException('Negocio no encontrado');
    return negocio;
  }

  async editar(id: number, data: any) {
    await this.obtenerPorId(id);
    return this.prisma.negocio.update({
      where: { id },
      data,
    });
  }
}


