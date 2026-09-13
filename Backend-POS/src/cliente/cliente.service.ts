import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  async crear(createClienteDto: CreateClienteDto) {
    return this.prisma.cliente.create({
      data: {
        ...createClienteDto,
        createdAt: new Date(),
      },
    });
  }

  async listar(negocioId: number) {
    return this.prisma.cliente.findMany({
      where: { negocioId },
    });
  }

  async obtenerPorId(id: number) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  async editar(id: number, updateClienteDto: UpdateClienteDto) {
    await this.obtenerPorId(id);
    return this.prisma.cliente.update({
      where: { id },
      data: { ...updateClienteDto, updatedAt: new Date() },
    });
  }

  async eliminar(id: number) {
    await this.obtenerPorId(id);
    return this.prisma.cliente.delete({ where: { id } });
  }
}



