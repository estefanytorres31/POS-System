import { PartialType } from '@nestjs/swagger';
import { CreateImpuestoDto } from './create-impuesto.dto.js';

export class UpdateImpuestoDto extends PartialType(CreateImpuestoDto) {}
