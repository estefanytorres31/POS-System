import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
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

  @ApiProperty({ example: 'Perú' })
  @IsNotEmpty()
  @IsString()
  pais: string;

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
