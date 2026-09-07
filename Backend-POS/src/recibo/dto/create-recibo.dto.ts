import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDetalleReembolsoDto {
  @IsNotEmpty() @IsNumber() articuloId: number;
  @IsNotEmpty() @IsNumber() cantidadDevuelta: number;
  @IsNotEmpty() @IsNumber() subtotal: number;
}

export class CreateReciboDto {
  @IsNotEmpty() @IsString() ref: string;
  @IsOptional() @IsNumber() monto_reembolsado?: number;
  @IsNotEmpty() @IsNumber() id_venta: number;
  @IsNotEmpty() @IsNumber() id_puntoDeVenta: number;
  @IsOptional() @IsNumber() valorDescuentoTotal?: number;
  @IsOptional() @IsNumber() valorImpuestoTotal?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleReembolsoDto)
  detalles: CreateDetalleReembolsoDto[];
}
