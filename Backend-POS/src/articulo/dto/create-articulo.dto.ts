import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoVenta } from '@prisma/client';

export class CreateArticuloDto {
  @ApiProperty({ example: 'Manzana' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ enum: TipoVenta, example: TipoVenta.Unidad })
  @IsNotEmpty()
  @IsEnum(TipoVenta)
  tipo_venta: TipoVenta;

  @ApiProperty({ example: 1.5 })
  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @ApiProperty({ example: 'REF123' })
  @IsNotEmpty()
  @IsString()
  ref: string;

  @ApiPropertyOptional({ example: 'color' })
  @IsOptional()
  @IsString()
  representacion?: string;

  @ApiPropertyOptional({ example: '#00ff00' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 'http://imagen.com/img.jpg' })
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  stock_actual?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  stock_minimo?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  id_categoria?: number;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  estado: boolean;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  id_puntoDeVenta: number;
}
