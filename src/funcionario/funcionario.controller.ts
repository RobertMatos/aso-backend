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
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('empresaId') empresaId?: string,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.FuncionarioWhereInput = {
      AND: [
        empresaId ? { empresaId } : {},
        search
          ? {
              OR: [
                {
                  nome: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  cpf: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {},
      ],
    };

    const [data, total] = await Promise.all([
      this.funcionarioService.findMany({ skip, take: +limit, where }),
      this.funcionarioService.count({ where }),
    ]);

    return {
      data,
      total,
      page: +page,
      lastPage: Math.ceil(total / +limit),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.funcionarioService.findOne(id);
  }

  @Public() 
  @Post()
  async create(@Body() dto: CreateFuncionarioDto) {
    return this.funcionarioService.create(dto);
  }

 
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.update(id, dto);
  }

 
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.funcionarioService.remove(id);
  }
}
