import { PartialType } from '@nestjs/mapped-types';
import { CreateRiscoOcupacionalDto } from './create-risco-ocupacional.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRiscoOcupacionalDto extends PartialType(CreateRiscoOcupacionalDto) {
  @ApiProperty({
    description: 'Nome do risco ocupacional',
    type: String,
    required: false, // Indica que o campo não é obrigatório
  })
  nome?: string;
}
