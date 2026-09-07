import { Controller, Post, Body, HttpCode, HttpStatus, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cerrar sesión' })
  logout(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    return this.authService.logout(token);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicitar recuperación de contraseña' })
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña usando token' })
  resetPassword(@Body() body: any) { // Idealmente con un DTO
    return this.authService.resetPassword(body.token, body.newPassword);
  }
}
