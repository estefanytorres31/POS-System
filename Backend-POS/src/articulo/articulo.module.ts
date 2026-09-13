import { Module }
from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ArticuloService } from './articulo.service.js';
import { ArticuloController } from './articulo.controller.js';

@Module({
  imports: [PassportModule],
  controllers: [ArticuloController],
  providers: [ArticuloService],
  exports: [ArticuloService],
})
export class ArticuloModule {}




