import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAtestadoDto } from './dto/create-atestado.dto';
import { UpdateAtestadoDto } from './dto/update-atestado.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AtestadoService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.AtestadoWhereInput;
  }) {
    const { skip, take, where } = params;
    return this.prisma.atestado.findMany({
      skip,
      take,
      where,
      orderBy: { data: 'desc' },
      include: { exame: true },
    });
  }

  async count(params: { where?: Prisma.AtestadoWhereInput }) {
    return this.prisma.atestado.count({ where: params.where });
  }

  async findOne(id: string) {
    const atestado = await this.prisma.atestado.findUnique({
      where: { id },
      include: { exame: true },
    });
    if (!atestado) throw new NotFoundException('Atestado não encontrado');
    return atestado;
  }

  async create(dto: CreateAtestadoDto) {
    return this.prisma.atestado.create({
      data: {
        ...dto,
        data: new Date(dto.data),
        arquivo: dto.arquivo ? Buffer.from(dto.arquivo, 'base64') : undefined,
      },
      include: { exame: true },
    });
  }

  async update(id: string, dto: UpdateAtestadoDto) {
    await this.findOne(id);
    return this.prisma.atestado.update({
      where: { id },
      data: {
        ...dto,
        data: dto.data ? new Date(dto.data) : undefined,
        arquivo: dto.arquivo ? Buffer.from(dto.arquivo, 'base64') : undefined,
      },
      include: { exame: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.atestado.delete({ where: { id } });
  }
}
