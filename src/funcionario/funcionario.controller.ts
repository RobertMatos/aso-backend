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
import { FilterFuncionarioDto } from './dto/filter-funcionario.dto';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
async findAll(@Query() query: FilterFuncionarioDto) {
  const {
    search,
    empresaId,
    page = '1',  // página como string por padrão
    limit = '10', // limite como string por padrão
  } = query;

  // Conversão dos valores para inteiros
  const pageInt = parseInt(page as string, 10);
  const limitInt = parseInt(limit as string, 10);

  // Verificar se a conversão foi bem-sucedida
  if (isNaN(pageInt) || isNaN(limitInt)) {
    throw new Error('Os parâmetros "page" e "limit" devem ser números válidos');
  }

  const skip = (pageInt - 1) * limitInt;

  const where: Prisma.FuncionarioWhereInput = {
    AND: [
      empresaId ? { empresaId } : {},
      search
        ? {
            OR: [
              { nome: { contains: search, mode: 'insensitive' } },
              { cpf: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {},
    ],
  };

  const [data, total] = await Promise.all([
    this.funcionarioService.findMany({ skip, take: limitInt, where }),
    this.funcionarioService.count({ where }),
  ]);

  return {
    data,
    total,
    page: pageInt,
    lastPage: Math.ceil(total / limitInt),
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
