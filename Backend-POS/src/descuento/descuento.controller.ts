import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DescuentoService } from './descuento.service.js';
import { CreateDescuentoDto } from './dto/create-descuento.dto.js';
import { UpdateDescuentoDto } from './dto/update-descuento.dto.js';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('descuentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('descuentos')
export class DescuentoController {
  constructor(private readonly descuentoService: DescuentoService) {}

  @Post()
  create(@Body() createDescuentoDto: CreateDescuentoDto) {
    return this.descuentoService.crear(createDescuentoDto);
  }

  @Get('punto/:idPunto')
  findAll(@Param('idPunto', ParseIntPipe) idPunto: number) {
    return this.descuentoService.listar(idPunto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.descuentoService.obtenerPorId(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDescuentoDto: UpdateDescuentoDto) {
    return this.descuentoService.editar(id, updateDescuentoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.descuentoService.eliminar(id);
  }
}
