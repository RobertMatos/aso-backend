import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRiscoOcupacionalDto } from './dto/create-risco-ocupacional.dto';
import { UpdateRiscoOcupacionalDto } from './dto/update-risco-ocupacional.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RiscoOcupacionalService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.RiscoOcupacionalWhereInput;
  }) {
    const { skip, take, where } = params;
    return this.prisma.riscoOcupacional.findMany({
      skip,
      take,
      where,
      orderBy: { nome: 'asc' },
    });
  }

  async count(params: { where?: Prisma.RiscoOcupacionalWhereInput }) {
    return this.prisma.riscoOcupacional.count({ where: params.where });
  }

  async findOne(id: string) {
    const risco = await this.prisma.riscoOcupacional.findUnique({
      where: { id },
      include: { exames: true },
    });
    if (!risco) throw new NotFoundException('Risco ocupacional não encontrado');
    return risco;
  }

  async create(dto: CreateRiscoOcupacionalDto) {
    return this.prisma.riscoOcupacional.create({ data: dto });
  }

  async update(id: string, dto: UpdateRiscoOcupacionalDto) {
    await this.findOne(id);
    return this.prisma.riscoOcupacional.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.riscoOcupacional.delete({ where: { id } });
  }
}
