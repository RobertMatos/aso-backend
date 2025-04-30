import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EstatisticasService } from './estatisticas.service';
import { RiscoEstatisticaQueryDto } from './dto/risco-estatistica-query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('estatisticas')
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  @Get('riscos-mais-comuns')
  async riscosMaisComuns(@Query() query: RiscoEstatisticaQueryDto) {
    return this.estatisticasService.riscosMaisComuns(query);
  }
}
