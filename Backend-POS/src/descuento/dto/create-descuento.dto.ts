import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { tipoDescuento } from '@prisma/client';

export class CreateDescuentoDto {
  @IsNotEmpty() @IsString() nombre: string;
  @IsNotEmpty() @IsEnum(tipoDescuento) tipo_descuento: tipoDescuento;
  @IsNotEmpty() @IsNumber() valor: number;
  @IsNotEmpty() @IsNumber() valor_calculado: number;
  @IsNotEmpty() @IsBoolean() estado: boolean;
  @IsNotEmpty() @IsNumber() id_puntoDeVenta: number;
}
