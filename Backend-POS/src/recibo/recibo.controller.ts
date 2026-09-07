import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ReciboService } from './recibo.service.js';
import { CreateReciboDto } from './dto/create-recibo.dto.js';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('recibos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('recibos')
export class ReciboController {
  constructor(private readonly reciboService: ReciboService) {}

  @Post('reembolsar')
  reembolsar(@Body() createReciboDto: CreateReciboDto) {
    return this.reciboService.crear(createReciboDto);
  }

  @Get('venta/:idVenta')
  listarPorVenta(@Param('idVenta', ParseIntPipe) idVenta: number, @Req() req: any) {
    const idPuntoDeVenta = req.user?.id_puntoDeVenta || 0;
    return this.reciboService.listarPorVenta(idVenta, idPuntoDeVenta);
  }

  @Get('punto/:idPunto')
  findAll(@Param('idPunto', ParseIntPipe) idPunto: number) {
    return this.reciboService.listar(idPunto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reciboService.obtenerPorId(id);
  }
}
