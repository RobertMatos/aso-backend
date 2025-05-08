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
import { AtestadoService } from './atestado.service';
import { CreateAtestadoDto } from './dto/create-atestado.dto';
import { UpdateAtestadoDto } from './dto/update-atestado.dto';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { FilterAtestadoDto } from './dto/filter-atestado.dto';

@Controller('atestados')
export class AtestadoController {
  constructor(private readonly atestadoService: AtestadoService) {}

  @Get()
  async findAll(@Query() query: FilterAtestadoDto) {
    const {
      search,
      exameId,
    } = query;
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    const skip = (page - 1) * limit;

    const where: Prisma.AtestadoWhereInput = {
      AND: [
        exameId ? { exameId } : {},
        search
          ? {
              descricao: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            }
          : {},
      ],
    };

    const [data, total] = await Promise.all([
      this.atestadoService.findMany({ skip, take: limit, where }),
      this.atestadoService.count({ where }),
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
    return this.atestadoService.findOne(id);
  }

  @Public()
  @Post()
  async create(@Body() dto: CreateAtestadoDto) {
    return this.atestadoService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAtestadoDto,
  ) {
    return this.atestadoService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.atestadoService.remove(id);
  }
}
