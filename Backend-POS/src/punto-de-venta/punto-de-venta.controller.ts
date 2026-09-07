import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PuntoDeVentaService } from './punto-de-venta.service.js';
import { CreatePuntoDeVentaDto } from './dto/create-punto-de-venta.dto.js';
import { UpdatePuntoDeVentaDto } from './dto/update-punto-de-venta.dto.js';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('punto-de-venta')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('punto-de-venta')
export class PuntoDeVentaController {
  constructor(private readonly puntoDeVentaService: PuntoDeVentaService) {}

  @Post()
  create(@Body() createDto: CreatePuntoDeVentaDto) {
    return this.puntoDeVentaService.crear(createDto);
  }

  @Get()
  findAll() {
    return this.puntoDeVentaService.listar();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.puntoDeVentaService.obtenerPorId(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdatePuntoDeVentaDto) {
    return this.puntoDeVentaService.editar(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.puntoDeVentaService.eliminar(id);
  }
}
