import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('jwt-auth') 
@Controller('medicos')
export class MedicoController {
  constructor(private readonly service: MedicoService) {}

  @Public() 
  @Post()
  create(@Body() dto: CreateMedicoDto) {
    return this.service.create(dto);
  }

 
  @Get()
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

 
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMedicoDto) {
    return this.service.update(id, dto);
  }

 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
