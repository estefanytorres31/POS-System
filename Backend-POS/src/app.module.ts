import { Module } from '@nestjs/common';
import { PassportGlobalModule } from './passport-global.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsuarioModule } from './usuario/usuario.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CategoriaModule } from './categoria/categoria.module.js';
import { ArticuloModule } from './articulo/articulo.module.js';
import { ClienteModule } from './cliente/cliente.module.js';
import { DescuentoModule } from './descuento/descuento.module.js';
import { ImpuestoModule } from './impuesto/impuesto.module.js';
import { PuntoDeVentaModule } from './punto-de-venta/punto-de-venta.module.js';
import { VentaModule } from './venta/venta.module.js';
import { NegocioModule } from './negocio/negocio.module.js';
import { ReciboModule } from './recibo/recibo.module.js';
import { MailModule } from './mail/mail.module.js';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PassportGlobalModule,
    PrismaModule, 
    ScheduleModule.forRoot(),
    MailModule,
    UsuarioModule, 
    AuthModule, 
    PuntoDeVentaModule,
    NegocioModule,
    CategoriaModule, 
    ArticuloModule,
    ClienteModule,
    DescuentoModule,
    ImpuestoModule,
    VentaModule,
    NegocioModule,
    ReciboModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}



