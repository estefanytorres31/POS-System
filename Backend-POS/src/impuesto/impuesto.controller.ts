import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ImpuestoService } from './impuesto.service.js';
import { CreateImpuestoDto } from './dto/create-impuesto.dto.js';
import { UpdateImpuestoDto } from './dto/update-impuesto.dto.js';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('impuestos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('impuestos')
export class ImpuestoController {
  constructor(private readonly impuestoService: ImpuestoService) {}

  @Post()
  create(@Body() createImpuestoDto: CreateImpuestoDto) {
    return this.impuestoService.crear(createImpuestoDto);
  }

  @Get('negocio/:idNegocio')
  findAll(@Param('idNegocio', ParseIntPipe) idNegocio: number) {
    return this.impuestoService.listar(idNegocio);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.impuestoService.obtenerPorId(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateImpuestoDto: UpdateImpuestoDto) {
    return this.impuestoService.editar(id, updateImpuestoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.impuestoService.eliminar(id);
  }
}



