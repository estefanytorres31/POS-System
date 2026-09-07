import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secreto_del_token',
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: payload.id },
    });
    
    if (!user) {
      throw new UnauthorizedException('Usuario no válido');
    }
    
    return { 
      id: payload.id, 
      email: payload.email, 
      rol: payload.rol,
      id_puntoDeVenta: user.id_puntoDeVenta 
    };
  }
}
