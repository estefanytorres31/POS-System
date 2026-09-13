import { Module }
from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PuntoDeVentaService } from './punto-de-venta.service.js';
import { PuntoDeVentaController } from './punto-de-venta.controller.js';

@Module({
  imports: [PassportModule],
  controllers: [PuntoDeVentaController],
  providers: [PuntoDeVentaService],
  exports: [PuntoDeVentaService],
})
export class PuntoDeVentaModule {}




