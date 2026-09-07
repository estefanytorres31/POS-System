import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('clientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.crear(createClienteDto);
  }

  @Get('punto/:idPunto')
  findAll(@Param('idPunto', ParseIntPipe) idPunto: number) {
    return this.clienteService.listar(idPunto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.obtenerPorId(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.editar(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.eliminar(id);
  }
}
