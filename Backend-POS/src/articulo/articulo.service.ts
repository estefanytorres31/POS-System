import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateArticuloDto } from './dto/create-articulo.dto.js';
import { UpdateArticuloDto } from './dto/update-articulo.dto.js';

@Injectable()
export class ArticuloService {
  constructor(private prisma: PrismaService) {}

  async crear(createArticuloDto: CreateArticuloDto) {
    return this.prisma.articulo.create({
      data: createArticuloDto,
    });
  }

  async listar(id_puntoDeVenta: number) {
    return this.prisma.articulo.findMany({
      where: { id_puntoDeVenta },
      include: {
        categoria: true,
      }
    });
  }

  async obtenerPorId(id: number) {
    const articulo = await this.prisma.articulo.findUnique({
      where: { id },
      include: {
        categoria: true,
      }
    });
    if (!articulo) {
      throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
    }
    return articulo;
  }

  async editar(id: number, updateArticuloDto: UpdateArticuloDto) {
    await this.obtenerPorId(id);
    return this.prisma.articulo.update({
      where: { id },
      data: updateArticuloDto,
    });
  }

  async eliminar(id: number) {
    await this.obtenerPorId(id);
    return this.prisma.articulo.delete({
      where: { id },
    });
  }
}
