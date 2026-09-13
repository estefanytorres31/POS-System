import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VentaService } from './venta.service.js';
import { CreateVentaDto } from './dto/create-venta.dto.js';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('ventas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ventas')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventaService.crear(createVentaDto);
  }

  @Get('punto/:idPunto')
  findAll(@Param('idPunto', ParseIntPipe) idPunto: number) {
    return this.ventaService.listar(idPunto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ventaService.obtenerPorId(id);
  }
}


