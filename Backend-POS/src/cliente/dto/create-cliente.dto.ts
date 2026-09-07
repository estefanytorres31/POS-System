import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty() @IsString() nombre: string;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() @IsString() telefono: string;
  @IsOptional() @IsString() direccion?: string;
  @IsOptional() @IsString() ciudad?: string;
  @IsOptional() @IsString() region?: string;
  @IsOptional() @IsString() pais?: string;
  @IsNotEmpty() @IsBoolean() estado: boolean;
  @IsNotEmpty() @IsNumber() id_puntoDeVenta: number;
}
