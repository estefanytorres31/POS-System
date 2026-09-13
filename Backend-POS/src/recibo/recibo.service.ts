import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReciboDto } from './dto/create-recibo.dto.js';

@Injectable()
export class ReciboService {
  constructor(private prisma: PrismaService) {}

  async crear(createReciboDto: CreateReciboDto) {
    const { detalles, monto_reembolsado, ...reciboData } = createReciboDto;

    return this.prisma.$transaction(async (prisma) => {
      // 1. Crear el recibo
      const recibo = await prisma.recibo.create({
        data: reciboData,
      });

      // 2. Crear el reembolso si hay detalles
      if (detalles && detalles.length > 0) {
        const reembolso = await prisma.reembolso.create({
          data: {
            ref: 'RB-' + reciboData.ref,
            montoReembolsado: monto_reembolsado || 0,
            reciboId: recibo.id,
            puntoDeVentaId: recibo.puntoDeVentaId,
          }
        });

        // 3. Crear detalles de reembolso y actualizar stock / venta
        for (const detalle of detalles) {
          const detalleVenta = await prisma.detalleVenta.findFirst({
            where: { ventaId: recibo.ventaId, articuloId: detalle.articuloId },
          });

          if (!detalleVenta) {
            throw new NotFoundException(`No se encontró el artículo ${detalle.articuloId} en la venta`);
          }

          await prisma.detalleReembolso.create({
            data: {
              detalleVentaId: detalleVenta.id,
              reembolsoId: reembolso.id,
              cantidadDevuelta: detalle.cantidadDevuelta,
              subtotal: detalle.subtotal,
            },
          });

          // Actualizar stock del inventario
          await prisma.inventario.update({
            where: {
              articuloId_puntoDeVentaId: {
                articuloId: detalle.articuloId,
                puntoDeVentaId: recibo.puntoDeVentaId,
              }
            },
            data: {
              stockActual: {
                increment: detalle.cantidadDevuelta,
              },
            },
          });
          
          // Actualizar detalle de venta para cantidad reembolsada
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

  async listar(puntoDeVentaId: number) {
    return this.prisma.recibo.findMany({
      where: { puntoDeVentaId },
      include: {
        reembolsos: {
          include: {
            detalles: true,
          }
        },
        venta: true,
      },
    });
  }

  async listarPorVenta(ventaId: number, puntoDeVentaId: number) {
    return this.prisma.recibo.findMany({
      where: { ventaId, puntoDeVentaId },
      include: {
        reembolsos: {
          include: {
            detalles: {
              include: { detalleVenta: { include: { articulo: true } } }
            }
          }
        }
      }
    });
  }

  async obtenerPorId(id: number) {
    const recibo = await this.prisma.recibo.findUnique({
      where: { id },
      include: {
        reembolsos: {
          include: {
            detalles: {
              include: { detalleVenta: { include: { articulo: true } } }
            }
          }
        },
        venta: true,
      },
    });
    if (!recibo) throw new NotFoundException('Recibo no encontrado');
    return recibo;
  }
}


