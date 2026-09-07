import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReciboDto } from './dto/create-recibo.dto.js';

@Injectable()
export class ReciboService {
  constructor(private prisma: PrismaService) {}

  async crear(createReciboDto: CreateReciboDto) {
    const { detalles, ...reciboData } = createReciboDto;

    return this.prisma.$transaction(async (prisma) => {
      // 1. Crear el recibo
      const recibo = await prisma.recibo.create({
        data: reciboData,
      });

      // 2. Crear detalles de reembolso y actualizar stock / venta
      for (const detalle of detalles) {
        await prisma.detalleReembolso.create({
          data: {
            ...detalle,
            reciboId: recibo.id,
          },
        });

        // Actualizar stock
        await prisma.articulo.update({
          where: { id: detalle.articuloId },
          data: {
            stock_actual: {
              increment: detalle.cantidadDevuelta,
            },
          },
        });
        
        // Actualizar detalle de venta para cantidad reembolsada
        const detalleVenta = await prisma.detalleVenta.findFirst({
          where: { ventaId: recibo.id_venta, articuloId: detalle.articuloId },
        });

        if (detalleVenta) {
          await prisma.detalleVenta.update({
            where: { id: detalleVenta.id },
            data: {
              cantidadReembolsadaTotal: {
                increment: detalle.cantidadDevuelta,
              },
            },
          });
        }
      }

      return recibo;
    });
  }

  async listar(id_puntoDeVenta: number) {
    return this.prisma.recibo.findMany({
      where: { id_puntoDeVenta },
      include: {
        detalles: true,
        venta: true,
      },
    });
  }

  async listarPorVenta(id_venta: number, id_puntoDeVenta: number) {
    return this.prisma.recibo.findMany({
      where: { id_venta, id_puntoDeVenta },
      include: {
        detalles: {
          include: { articulo: true }
        }
      }
    });
  }

  async obtenerPorId(id: number) {
    const recibo = await this.prisma.recibo.findUnique({
      where: { id },
      include: {
        detalles: {
          include: { articulo: true }
        },
        venta: true,
      },
    });
    if (!recibo) throw new NotFoundException('Recibo no encontrado');
    return recibo;
  }
}
