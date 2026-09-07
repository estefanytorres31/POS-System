import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TipoPago } from '@prisma/client';

export class CreateDetalleVentaDto {
  @IsNotEmpty() @IsNumber() articuloId: number;
  @IsNotEmpty() @IsNumber() cantidad: number;
  @IsNotEmpty() @IsNumber() precio_unitario: number;
  @IsNotEmpty() @IsNumber() subtotal: number;
}

export class CreateVentaDto {
  @IsNotEmpty() @IsNumber() subtotal: number;
  @IsNotEmpty() @IsNumber() total: number;
  @IsOptional() @IsNumber() vDescuento?: number;
  @IsOptional() @IsNumber() VImpuesto?: number;
  @IsNotEmpty() @IsEnum(TipoPago) tipoPago: TipoPago;
  @IsOptional() @IsNumber() impuestoId?: number;
  @IsOptional() @IsNumber() descuentoId?: number;
  @IsOptional() @IsNumber() clienteId?: number;
  @IsNotEmpty() @IsNumber() usuarioId: number;
  @IsNotEmpty() @IsNumber() id_puntoDeVenta: number;
  @IsOptional() @IsNumber() dineroRecibido?: number;
  @IsOptional() @IsNumber() cambio?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleVentaDto)
  detalles: CreateDetalleVentaDto[];
}
