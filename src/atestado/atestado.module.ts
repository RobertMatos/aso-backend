import { Module } from '@nestjs/common';
import { AtestadoService } from './atestado.service';
import { AtestadoController } from './atestado.controller';

@Module({
  controllers: [AtestadoController],
  providers: [AtestadoService],
})
export class AtestadoModule {}
