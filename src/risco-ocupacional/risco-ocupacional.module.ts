import { Module } from '@nestjs/common';
import { RiscoOcupacionalService } from './risco-ocupacional.service';
import { RiscoOcupacionalController } from './risco-ocupacional.controller';

@Module({
  controllers: [RiscoOcupacionalController],
  providers: [RiscoOcupacionalService],
})
export class RiscoOcupacionalModule {}
