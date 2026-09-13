import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ example: 'Juan Perez' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'juan@example.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '999999999' })
  @IsNotEmpty()
  @IsString()
  telefono: string;

  @ApiPropertyOptional({ example: 'Direccion 1' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  ciudadId?: number;

  @ApiPropertyOptional({ example: '051' })
  @IsOptional()
  @IsString()
  codigo_postal?: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  estado: boolean;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  negocioId: number;
}


