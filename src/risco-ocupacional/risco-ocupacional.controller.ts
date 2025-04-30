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
import { RiscoOcupacionalService } from './risco-ocupacional.service';
import { CreateRiscoOcupacionalDto } from './dto/create-risco-ocupacional.dto';
import { UpdateRiscoOcupacionalDto } from './dto/update-risco-ocupacional.dto';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('jwt-auth') 
@Controller('riscos-ocupacionais')
export class RiscoOcupacionalController {
  constructor(
    private readonly riscoOcupacionalService: RiscoOcupacionalService,
  ) {}

 
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.RiscoOcupacionalWhereInput = search
      ? {
          nome: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [data, total] = await Promise.all([
      this.riscoOcupacionalService.findMany({ skip, take: +limit, where }),
      this.riscoOcupacionalService.count({ where }),
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
    return this.riscoOcupacionalService.findOne(id);
  }

  @Public()
  @Post()
  async create(@Body() dto: CreateRiscoOcupacionalDto) {
    return this.riscoOcupacionalService.create(dto);
  }

 
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRiscoOcupacionalDto,
  ) {
    return this.riscoOcupacionalService.update(id, dto);
  }

 
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.riscoOcupacionalService.remove(id);
  }
}
