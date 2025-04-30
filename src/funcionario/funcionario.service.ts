import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FuncionarioService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.FuncionarioWhereInput;
  }) {
    const { skip, take, where } = params;
    return this.prisma.funcionario.findMany({
      skip,
      take,
      where,
      orderBy: { createdAt: 'desc' },
      include: { empresa: true },
    });
  }

  async count(params: { where?: Prisma.FuncionarioWhereInput }) {
    return this.prisma.funcionario.count({
      where: params.where,
    });
  }

  async findOne(id: string) {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { id },
      include: { empresa: true },
    });
    if (!funcionario) throw new NotFoundException('Funcionário não encontrado');
    return funcionario;
  }

  async create(dto: CreateFuncionarioDto) {
    return this.prisma.funcionario.create({ data: dto });
  }

  async update(id: string, dto: UpdateFuncionarioDto) {
    await this.findOne(id); // garante que existe
    return this.prisma.funcionario.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // garante que existe
    return this.prisma.funcionario.delete({ where: { id } });
  }
}
