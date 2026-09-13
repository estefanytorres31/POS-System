import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async enviarCorreo(to: string, subject: string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
      });
      this.logger.log(`Correo enviado a ${to}: ${info.messageId}`);
    } catch (error: any) {
      this.logger.error(`Error al enviar correo a ${to}: ${error.message}`);
      throw error;
    }
  }

  async enviarCorreoBienvenida(email: string, nombre: string, passwordGenerado: string, urlLogin: string) {
    const html = `
      <h1>Bienvenido a nuestro sistema, ${nombre}!</h1>
      <p>Tu cuenta ha sido creada exitosamente como empleado.</p>
      <p>Tus credenciales de acceso son:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Contraseña:</strong> ${passwordGenerado}</li>
      </ul>
      <p>Puedes iniciar sesión en: <a href="${urlLogin}">${urlLogin}</a></p>
    `;
    await this.enviarCorreo(email, 'Bienvenido al Sistema - Cuenta de Empleado', html);
  }

  async enviarCorreoCambioPass(email: string, nombre: string, resetLink: string) {
    const html = `
      <h1>Hola ${nombre},</h1>
      <p>Has solicitado restablecer tu contraseña.</p>
      <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
      <a href="${resetLink}">Restablecer Contraseña</a>
      <p>Este enlace expirará en 1 hora.</p>
    `;
    await this.enviarCorreo(email, 'Recuperación de Contraseña', html);
  }

  async enviarCorreoEliminacionTemporal(email: string, nombre: string) {
    const html = `
      <h1>Hola ${nombre},</h1>
      <p>Tu cuenta ha sido desactivada temporalmente.</p>
      <p>Tienes 7 días para recuperarla antes de que se elimine permanentemente.</p>
    `;
    await this.enviarCorreo(email, 'Cuenta Desactivada Temporalmente', html);
  }

  async enviarCorreoEliminacionPermanente(email: string, nombre: string) {
    const html = `
      <h1>Hola ${nombre},</h1>
      <p>Tu cuenta ha sido eliminada de forma permanente del sistema.</p>
    `;
    await this.enviarCorreo(email, 'Cuenta Eliminada', html);
  }

  async enviarCorreoRestauracion(email: string, nombre: string) {
    const html = `
      <h1>Hola ${nombre},</h1>
      <p>Tu cuenta ha sido restaurada exitosamente.</p>
      <p>Bienvenido de vuelta!</p>
    `;
    await this.enviarCorreo(email, 'Cuenta Restaurada', html);
  }
}


