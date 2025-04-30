import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { FilterEmpresaDto } from './dto/filter-empresa.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEmpresaDto) {
    return this.prisma.empresa.create({ data });
  }

  async findAll(filter: FilterEmpresaDto) {
    const { search, page = '1', limit = '10' } = filter;
  
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
  
    const where: Prisma.EmpresaWhereInput = search
      ? {
          OR: [
            {
              nome: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              cnpj: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};
  
    const [data, total] = await Promise.all([
      this.prisma.empresa.findMany({
        where,
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.empresa.count({ where }),
    ]);
  
    return { data, total, page: pageNumber, limit: limitNumber };
  }
  

  findOne(id: string) {
    return this.prisma.empresa.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateEmpresaDto) {
    return this.prisma.empresa.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.empresa.delete({ where: { id } });
  }
}
