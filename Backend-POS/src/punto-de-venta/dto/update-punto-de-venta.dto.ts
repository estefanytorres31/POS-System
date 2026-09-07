import { PartialType } from '@nestjs/swagger';
import { CreatePuntoDeVentaDto } from './create-punto-de-venta.dto.js';

export class UpdatePuntoDeVentaDto extends PartialType(CreatePuntoDeVentaDto) {}
