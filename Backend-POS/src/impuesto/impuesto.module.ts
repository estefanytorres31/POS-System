import { Module }
from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ImpuestoService } from './impuesto.service.js';
import { ImpuestoController } from './impuesto.controller.js';

@Module({
  imports: [PassportModule],
  controllers: [ImpuestoController],
  providers: [ImpuestoService],
  exports: [ImpuestoService],
})
export class ImpuestoModule {}




