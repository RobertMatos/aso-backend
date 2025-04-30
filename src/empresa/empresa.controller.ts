import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { FilterEmpresaDto } from './dto/filter-empresa.dto';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Public() 
  @Post() 
  create(@Body() dto: CreateEmpresaDto) {
    return this.empresaService.create(dto);
  }

  @Get()
  findAll(@Query() filter: FilterEmpresaDto) {
    return this.empresaService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmpresaDto) {
    return this.empresaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(id);
  }
}
