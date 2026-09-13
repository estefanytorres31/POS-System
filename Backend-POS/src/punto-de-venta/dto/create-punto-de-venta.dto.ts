import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePuntoDeVentaDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  negocioId: number;

  @ApiProperty({ example: 'Sede Centro' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiPropertyOptional({ example: 'Direccion 1' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}


