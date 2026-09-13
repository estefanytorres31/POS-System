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
  tipoVenta: TipoVenta;

  @ApiProperty({ example: 1.5 })
  @IsNotEmpty()
  @IsNumber()
  precioVenta: number;

  @ApiPropertyOptional({ example: 1.0 })
  @IsOptional()
  @IsNumber()
  precioCosto?: number;

  @ApiProperty({ example: 'REF123' })
  @IsNotEmpty()
  @IsString()
  ref: string;

  @ApiPropertyOptional({ example: 'color' })
  @IsOptional()
  @IsString()
  representacion?: 'Color' | 'Imagen';

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
  stockActual?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  stockMinimo?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  categoriaId?: number;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  estado: boolean;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  negocioId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  puntoDeVentaId?: number;
}



