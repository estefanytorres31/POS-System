import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Bebidas' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ example: '#ff0000' })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  estado: boolean;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  id_puntoDeVenta: number;
}
