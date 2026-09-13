import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { tipoDescuento } from '@prisma/client';

export class CreateDescuentoDto {
  @IsNotEmpty() @IsString() nombre: string;
  @IsNotEmpty() @IsEnum(tipoDescuento) tipoDescuento: tipoDescuento;
  @IsNotEmpty() @IsNumber() valor: number;
  @IsNotEmpty() @IsNumber() valorCalculado: number;
  @IsNotEmpty() @IsBoolean() estado: boolean;
  @IsNotEmpty() @IsNumber() negocioId: number;
}



