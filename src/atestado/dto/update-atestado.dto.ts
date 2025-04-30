import {
  IsUUID,
  IsString,
  IsDateString,
  IsOptional,
  IsBase64,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAtestadoDto {
  @ApiProperty({
    description: 'Descrição do atestado (opcional)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({
    description: 'Data do atestado (opcional) no formato ISO 8601',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  data?: string;

  @ApiProperty({
    description: 'ID do exame relacionado ao atestado (opcional)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID()
  exameId?: string;

  @ApiProperty({
    description: 'Arquivo em base64 (opcional)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsBase64()
  arquivo?: string; // Espera o conteúdo do arquivo como base64
}
