import { Module }
from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DescuentoService } from './descuento.service.js';
import { DescuentoController } from './descuento.controller.js';

@Module({
  imports: [PassportModule],
  controllers: [DescuentoController],
  providers: [DescuentoService],
  exports: [DescuentoService],
})
export class DescuentoModule {}


