import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCategoriaDto } from './dto/create-categoria.dto.js';
import { UpdateCategoriaDto } from './dto/update-categoria.dto.js';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async crear(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: createCategoriaDto,
    });
  }

  async listar(id_puntoDeVenta: number) {
    return this.prisma.categoria.findMany({
      where: { id_puntoDeVenta },
    });
  }

  async obtenerPorId(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return categoria;
  }

  async editar(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.obtenerPorId(id); // Verifica existencia
    return this.prisma.categoria.update({
      where: { id },
      data: updateCategoriaDto,
    });
  }

  async eliminar(id: number) {
    await this.obtenerPorId(id);
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}
