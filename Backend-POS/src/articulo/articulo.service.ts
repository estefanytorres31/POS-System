import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateArticuloDto } from './dto/create-articulo.dto.js';
import { UpdateArticuloDto } from './dto/update-articulo.dto.js';

@Injectable()
export class ArticuloService {
  constructor(private prisma: PrismaService) {}

  async crear(createArticuloDto: CreateArticuloDto) {
    const { puntoDeVentaId, stockActual, stockMinimo, ...articuloData } = createArticuloDto;
    
    // Crear el articulo en el negocio
    const articulo = await this.prisma.articulo.create({
      data: { ...articuloData, precioCosto: articuloData.precioCosto || 0, representacion: articuloData.representacion as any },
    });

    // Si se especificó un punto de venta, creamos su inventario inicial allí
    if (puntoDeVentaId) {
      await this.prisma.inventario.create({
        data: {
          articuloId: articulo.id,
          puntoDeVentaId,
          stockActual: stockActual || 0,
          stockMinimo: stockMinimo || 5,
        }
      });
    }

    return articulo;
  }

  async listar(negocioId: number) {
    return this.prisma.articulo.findMany({
      where: { negocioId },
      include: {
        categoria: true,
        inventarios: true, // Para poder ver el stock en cada sucursal
      }
    });
  }

  async obtenerPorId(id: number) {
    const articulo = await this.prisma.articulo.findUnique({
      where: { id },
      include: {
        categoria: true,
        inventarios: true,
      }
    });
    if (!articulo) {
      throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
    }
    return articulo;
  }

  async editar(id: number, updateArticuloDto: UpdateArticuloDto) {
    await this.obtenerPorId(id);
    const { puntoDeVentaId, stockActual, stockMinimo, ...articuloData } = updateArticuloDto;
    
    return this.prisma.articulo.update({
      where: { id },
      data: { ...articuloData, precioCosto: articuloData.precioCosto || 0, representacion: articuloData.representacion as any },
    });
  }

  async eliminar(id: number) {
    await this.obtenerPorId(id);
    
    // Primero eliminamos los inventarios asociados
    await this.prisma.inventario.deleteMany({
      where: { articuloId: id }
    });

    return this.prisma.articulo.delete({
      where: { id },
    });
  }
}



