import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { tipoImpuesto } from '@prisma/client';

export class CreateImpuestoDto {
  @IsNotEmpty() @IsString() nombre: string;
  @IsNotEmpty() @IsNumber() tasa: number;
  @IsNotEmpty() @IsEnum(tipoImpuesto) tipoImpuesto: tipoImpuesto;
  @IsNotEmpty() @IsBoolean() estado: boolean;
  @IsNotEmpty() @IsNumber() negocioId: number;
}



