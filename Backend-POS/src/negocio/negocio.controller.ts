import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { NegocioService } from './negocio.service.js';

@Controller('negocio')
export class NegocioController {
  constructor(private readonly negocioService: NegocioService) {}

  @Post()
  crear(@Body() createDto: any) {
    return this.negocioService.crear(createDto);
  }

  @Get()
  listar() {
    return this.negocioService.listar();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.negocioService.obtenerPorId(+id);
  }

  @Put(':id')
  editar(@Param('id') id: string, @Body() updateDto: any) {
    return this.negocioService.editar(+id, updateDto);
  }
}


