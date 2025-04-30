import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RiscoEstatisticaQueryDto } from './dto/risco-estatistica-query.dto';

@Injectable()
export class EstatisticasService {
  constructor(private readonly prisma: PrismaService) {}

  async riscosMaisComuns(query: RiscoEstatisticaQueryDto) {
    const { empresaId, tipoExame, dataInicio, dataFim, page = 1, limit = 10 } = query;

    const whereExame = {
      ...(empresaId && { funcionario: { empresaId } }),
      ...(tipoExame && { tipo: tipoExame }),
      ...(dataInicio || dataFim
        ? {
            dataRealizacao: {
              ...(dataInicio && { gte: new Date(dataInicio) }),
              ...(dataFim && { lte: new Date(dataFim) }),
            },
          }
        : {}),
    };
    

    const allRiscos = await this.prisma.riscoOcupacional.findMany({
      select: {
        id: true,
        nome: true,
        exames: {
          where: whereExame,
          select: { id: true },
        },
      },
    });

    const riscosOrdenados = allRiscos
      .map((risco) => ({
        risco: risco.nome,
        quantidade: risco.exames.length,
      }))
      .filter((r) => r.quantidade > 0)
      .sort((a, b) => b.quantidade - a.quantidade);

    const start = (page - 1) * limit;
    const paginados = riscosOrdenados.slice(start, start + limit);

    return {
      data: paginados,
      total: riscosOrdenados.length,
      page,
      lastPage: Math.ceil(riscosOrdenados.length / limit),
    };
  }
}
