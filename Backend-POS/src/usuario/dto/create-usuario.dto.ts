import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Juan Perez' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'juan@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  ciudadId?: number;

  @ApiPropertyOptional({ example: 'Av. Siempre Viva 123' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ example: '051' })
  @IsOptional()
  @IsString()
  codigo_postal?: string;

  @ApiProperty({ example: 'Gerente' })
  @IsNotEmpty()
  @IsString()
  cargo: string;

  @ApiPropertyOptional({ example: 'Propietario' })
  @IsOptional()
  @IsString()
  rol?: 'Admin' | 'Propietario' | 'Empleado';

  @ApiPropertyOptional({ example: '999999999' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ example: 'Mi Tienda' })
  @IsOptional()
  @IsString()
  nombreNegocio?: string;
}


