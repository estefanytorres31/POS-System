import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UsuarioService } from './usuario.service.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('propietario')
  @ApiOperation({ summary: 'Crear un nuevo propietario o administrador' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  createPropietario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.crearPropietario(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios propietarios' })
  findAll() {
    return this.usuarioService.listarUsuarios();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un usuario por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.buscarUsuarioPorId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos de un usuario' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.editarUsuarioPorId(id, updateUsuarioDto);
  }

  @Patch(':id/cambiar-contrasena')
  @ApiOperation({ summary: 'Cambiar la contraseña de un usuario' })
  cambiarContrasena(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.usuarioService.cambiarContrasena(id, body.contrasenaActual, body.nuevaContrasena);
  }

  @Delete(':id/temporal')
  @ApiOperation({ summary: 'Eliminar cuenta temporalmente (Soft delete)' })
  eliminarTemporalmente(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.eliminarTemporalmente(id);
  }

  @Patch(':id/restaurar')
  @ApiOperation({ summary: 'Restaurar cuenta eliminada temporalmente' })
  restaurarCuenta(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.restaurarCuenta(id);
  }

  @Delete(':id/permanente')
  @ApiOperation({ summary: 'Eliminar cuenta de forma permanente' })
  eliminarPermanentemente(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.eliminarPermanentemente(id);
  }

  @Post('empleado')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear un nuevo empleado (solo Propietario)' })
  crearEmpleado(@Body() createUsuarioDto: CreateUsuarioDto, @Req() req: any) {
    // Assuming req.user is set by JwtAuthGuard and contains id_puntoDeVenta
    const propietarioIdPuntoDeVenta = req.user?.id_puntoDeVenta || 0;
    return this.usuarioService.crearEmpleado(createUsuarioDto, propietarioIdPuntoDeVenta);
  }

  @Get('empleado/lista')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar empleados del punto de venta' })
  listarEmpleados(@Req() req: any) {
    const idPuntoDeVenta = req.user?.id_puntoDeVenta || 0;
    return this.usuarioService.listarEmpleados(idPuntoDeVenta);
  }
}
