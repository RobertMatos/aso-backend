import { Module } from '@nestjs/common';
import { EstatisticasService } from './estatisticas.service';
import { EstatisticasController } from './estatisticas.controller';

@Module({
  controllers: [EstatisticasController],
  providers: [EstatisticasService],
})
export class EstatisticasModule {}
