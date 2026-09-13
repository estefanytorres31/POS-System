import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ArticuloService } from './articulo.service.js';
import { CreateArticuloDto } from './dto/create-articulo.dto.js';
import { UpdateArticuloDto } from './dto/update-articulo.dto.js';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('articulos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('articulos')
export class ArticuloController {
  constructor(private readonly articuloService: ArticuloService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo artículo' })
  create(@Body() createArticuloDto: CreateArticuloDto) {
    return this.articuloService.crear(createArticuloDto);
  }

  @Get('negocio/:idNegocio')
  @ApiOperation({ summary: 'Listar artículos por punto de venta' })
  findAll(@Param('idNegocio', ParseIntPipe) idNegocio: number) {
    return this.articuloService.listar(idNegocio);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un artículo por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articuloService.obtenerPorId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar un artículo' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateArticuloDto: UpdateArticuloDto) {
    return this.articuloService.editar(id, updateArticuloDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un artículo' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articuloService.eliminar(id);
  }
}



