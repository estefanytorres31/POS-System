import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || '123456';
  
  // Verificar si ya existe un SuperAdmin
  const superAdminExists = await prisma.usuario.findFirst({
    where: { rol: 'SuperAdmin' }
  });

  if (superAdminExists) {
    console.log('✅ El usuario SuperAdmin ya existe. Omitiendo la creación.');
    return;
  }

  console.log(`Creando estructura SaaS inicial...`);
  
  // 1. Crear estructura geográfica y tipos de documento iniciales
  const pais = await prisma.pais.create({
    data: {
      nombre: 'Perú',
      codigo: 'PE'
    }
  });

  const provincia = await prisma.provincia.create({
    data: {
      nombre: 'Lima',
      paisId: pais.id
    }
  });

  const ciudad = await prisma.ciudad.create({
    data: {
      nombre: 'Lima Metropolitana',
      provinciaId: provincia.id
    }
  });

  // Tipos de Documento
  const tipoDNI = await prisma.tipoDocumento.upsert({
    where: { nombre: 'DNI' },
    update: {},
    create: { nombre: 'DNI' },
  });

  const tipoRUC = await prisma.tipoDocumento.upsert({
    where: { nombre: 'RUC' },
    update: {},
    create: { nombre: 'RUC' },
  });

  // Encriptar la contraseña base
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // 2. Crear al SuperAdmin
  const superAdmin = await prisma.usuario.create({
    data: {
      nombre: 'Super Administrador',
      email: 'superadmin@gmail.com',
      password: hashedPassword,
      ciudadId: ciudad.id,
      rol: 'SuperAdmin',
      cargo: 'Dueño del Sistema',
      estado: true,
      createdAt: new Date()
    }
  });

  // 3. Crear un Negocio de Prueba
  const negocioPrueba = await prisma.negocio.create({
    data: {
      nombre: 'Negocio de Prueba S.A.C',
      createdAt: new Date(),
      estado: true,
      estadoSuscripcion: 'Activa',
      ciudadId: ciudad.id,
      direccion: 'Av. Principal 123'
    }
  });

  // 4. Crear PuntoDeVenta inicial (Sucursal) para el Negocio
  const sucursalPrincipal = await prisma.puntoDeVenta.create({
    data: {
      nombre: 'Sede Principal',
      direccion: 'Av. Principal 123 - Local 1',
      ciudadId: ciudad.id,
      negocioId: negocioPrueba.id
    }
  });

  // 5. Crear al Propietario del Negocio de Prueba
  const propietarioUser = await prisma.usuario.create({
    data: {
      nombre: 'Propietario Test',
      email: adminEmail,
      password: hashedPassword,
      ciudadId: ciudad.id,
      direccion: 'Calle Falsa 456',
      rol: 'Propietario',
      cargo: 'Dueño del Negocio',
      nombreNegocio: 'POS Admin',
      estado: true,
      createdAt: new Date(),
      negocioId: negocioPrueba.id
    }
  });

  console.log(`✅ Estructura SaaS creada exitosamente.`);
  console.log(`--- Credenciales SuperAdmin ---`);
  console.log(`Email: superadmin@gmail.com`);
  console.log(`--- Credenciales Propietario (Negocio Test) ---`);
  console.log(`Email: ${adminEmail}`);
  console.log(`Password: (La configurada en ADMIN_PASSWORD o '123456')`);
}

main()
  .catch((e) => {
    console.error('Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
