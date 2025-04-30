import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';

@Injectable()
export class ExameService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ExameWhereInput;
  }) {
    const { skip, take, where } = params;
    return this.prisma.exame.findMany({
      skip,
      take,
      where,
      orderBy: { dataRealizacao: 'desc' },
      include: {
        funcionario: true,
        medico: true,
        riscos: true,
        atestado: true,
      },
    });
  }

  async count(params: { where?: Prisma.ExameWhereInput }) {
    return this.prisma.exame.count({
      where: params.where,
    });
  }

  async findOne(id: string) {
    const exame = await this.prisma.exame.findUnique({
      where: { id },
      include: {
        funcionario: true,
        medico: true,
        riscos: true,
        atestado: true,
      },
    });

    if (!exame) {
      throw new NotFoundException('Exame não encontrado');
    }

    return exame;
  }

  async create(dto: CreateExameDto) {
    const { riscos, dataRealizacao, ...rest } = dto;

    return this.prisma.exame.create({
      data: {
        ...rest,
        dataRealizacao: new Date(dataRealizacao),
        riscos: {
          connect: riscos?.map((id) => ({ id })) || [],
        },
      },
      include: {
        funcionario: true,
        medico: true,
        riscos: true,
        atestado: true,
      },
    });
  }

  async update(id: string, dto: UpdateExameDto) {
    await this.findOne(id); // Garante que o exame existe

    const { riscos, dataRealizacao, ...rest } = dto;

    return this.prisma.exame.update({
      where: { id },
      data: {
        ...rest,
        ...(dataRealizacao && { dataRealizacao: new Date(dataRealizacao) }),
        ...(riscos && {
          riscos: {
            set: riscos.map((id) => ({ id })),
          },
        }),
      },
      include: {
        funcionario: true,
        medico: true,
        riscos: true,
        atestado: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Garante que o exame existe
    return this.prisma.exame.delete({
      where: { id },
    });
  }
}
