import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ExameService } from './exame.service';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('exames')
export class ExameController {
  constructor(private readonly exameService: ExameService) {}

  @Get()
async findAll(
  @Query('page') pageStr = '1',
  @Query('limit') limitStr = '10',
  @Query('funcionarioId') funcionarioId?: string,
  @Query('search') search?: string,
) {
  const page = Number(pageStr);
  const limit = Number(limitStr);
  const skip = (page - 1) * limit;

  const where: Prisma.ExameWhereInput = {
    AND: [
      funcionarioId ? { funcionarioId } : {},
      search
        ? {
            OR: [
              {
                funcionario: {
                  nome: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                tipo: {
                  equals: search as any, // você pode querer validar ou tipar melhor aqui
                },
              },
            ],
          }
        : {},
    ],
  };

  const [data, total] = await Promise.all([
    this.exameService.findMany({ skip, take: limit, where }),
    this.exameService.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    lastPage: Math.ceil(total / limit),
  };
}

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.exameService.findOne(id);
  }

  @Public()
  @Post()
  async create(@Body() dto: CreateExameDto) {
    return this.exameService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateExameDto,
  ) {
    return this.exameService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.exameService.remove(id);
  }
}
