import { Module }
from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ReciboService } from './recibo.service.js';
import { ReciboController } from './recibo.controller.js';

@Module({
  imports: [PassportModule],
  controllers: [ReciboController],
  providers: [ReciboService],
  exports: [ReciboService],
})
export class ReciboModule {}


