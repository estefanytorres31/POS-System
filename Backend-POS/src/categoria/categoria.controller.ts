import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service.js';
import { CreateCategoriaDto } from './dto/create-categoria.dto.js';
import { UpdateCategoriaDto } from './dto/update-categoria.dto.js';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('categorias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.crear(createCategoriaDto);
  }

  @Get('punto/:idPuntoDeVenta')
  @ApiOperation({ summary: 'Listar categorías por punto de venta' })
  findAll(@Param('idPuntoDeVenta', ParseIntPipe) idPuntoDeVenta: number) {
    return this.categoriaService.listar(idPuntoDeVenta);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.obtenerPorId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar una categoría' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.editar(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.eliminar(id);
  }
}
