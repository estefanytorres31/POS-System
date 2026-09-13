import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateVentaDto } from './dto/create-venta.dto.js';

@Injectable()
export class VentaService {
  constructor(private prisma: PrismaService) {}

  async crear(createVentaDto: CreateVentaDto) {
    const { detalles, ...ventaData } = createVentaDto;

    return this.prisma.$transaction(async (prisma) => {
      // 1. Crear la venta
      const venta = await prisma.venta.create({
        data: ventaData,
      });

      // 2. Crear los detalles y actualizar stock
      for (const detalle of detalles) {
        await prisma.detalleVenta.create({
          data: {
            ...detalle,
            ventaId: venta.id,
            puntoDeVentaId: venta.puntoDeVentaId,
          },
        });

        // Actualizar stock del inventario
        await prisma.inventario.update({
          where: {
            articuloId_puntoDeVentaId: {
              articuloId: detalle.articuloId,
              puntoDeVentaId: venta.puntoDeVentaId,
            }
          },
          data: {
            stockActual: {
              decrement: detalle.cantidad,
            },
          },
        });
      }

      return venta;
    });
  }

  async listar(puntoDeVentaId: number) {
    return this.prisma.venta.findMany({
      where: { puntoDeVentaId },
      include: {
        detalles: true,
        cliente: true,
        usuario: true,
      },
    });
  }

  async obtenerPorId(id: number) {
    const venta = await this.prisma.venta.findUnique({
      where: { id },
      include: {
        detalles: {
          include: { articulo: true }
        },
        cliente: true,
        usuario: true,
      },
    });
    if (!venta) throw new NotFoundException('Venta no encontrada');
    return venta;
  }
}


