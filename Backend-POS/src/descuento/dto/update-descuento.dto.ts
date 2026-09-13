import { PartialType } from '@nestjs/swagger';
import { CreateDescuentoDto } from './create-descuento.dto.js';

export class UpdateDescuentoDto extends PartialType(CreateDescuentoDto) {}


