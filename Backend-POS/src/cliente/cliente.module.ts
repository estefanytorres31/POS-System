import { Module }
from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ClienteService } from './cliente.service.js';
import { ClienteController } from './cliente.controller.js';

@Module({
  imports: [PassportModule],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}




