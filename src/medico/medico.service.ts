import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MedicoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMedicoDto) {
    return this.prisma.medico.create({ data: dto });
  }

  async findAll(query: { page?: string; take?: string; search?: string }) {
    const page = Math.max(Number(query.page) || 1, 1);
    const take = Math.max(Number(query.take) || 10, 1);
    const skip = (page - 1) * take;
    const search = query.search?.trim();
  
    const where: Prisma.MedicoWhereInput | undefined = search
      ? {
          OR: [
            {
              nome: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              crm: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : undefined;
  
    const [data, total] = await Promise.all([
      this.prisma.medico.findMany({
        where,
        skip,
        take,
        orderBy: { nome: 'asc' },
      }),
      this.prisma.medico.count({ where }),
    ]);
  
    return {
      data,
      total,
      page,
      pages: Math.ceil(total / take),
    };
  }
  

  async findOne(id: string) {
    const medico = await this.prisma.medico.findUnique({ where: { id } });
    if (!medico) throw new NotFoundException('Médico não encontrado');
    return medico;
  }

  async update(id: string, dto: UpdateMedicoDto) {
    await this.findOne(id);
    return this.prisma.medico.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.medico.delete({ where: { id } });
  }
}
