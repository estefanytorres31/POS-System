import { Module }
from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { VentaService } from './venta.service.js';
import { VentaController } from './venta.controller.js';

@Module({
  imports: [PassportModule],
  controllers: [VentaController],
  providers: [VentaService],
  exports: [VentaService],
})
export class VentaModule {}


