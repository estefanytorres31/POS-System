import { Module }
from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CategoriaService } from './categoria.service.js';
import { CategoriaController } from './categoria.controller.js';

@Module({
  imports: [PassportModule],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService],
})
export class CategoriaModule {}


