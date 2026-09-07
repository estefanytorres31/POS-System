import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreatePuntoDeVentaDto {
  @IsNotEmpty() @IsString() nombre: string;
  @IsNotEmpty() @IsString() propietario: string;
  @IsNotEmpty() @IsBoolean() estado: boolean;
}
