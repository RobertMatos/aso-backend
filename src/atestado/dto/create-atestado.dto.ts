import {
  IsUUID,
  IsString,
  IsDateString,
  IsOptional,
  IsBase64,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAtestadoDto {
  @ApiProperty({
    description: 'Descrição do atestado',
    type: String,
  })
  @IsString()
  descricao: string;

  @ApiProperty({
    description: 'Data do atestado (ISO 8601)',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  data: string;

  @ApiProperty({
    description: 'ID do exame relacionado ao atestado',
    type: String,
  })
  @IsUUID()
  exameId: string;

  @ApiPropertyOptional({
    description: 'Arquivo em base64 (opcional)',
    type: String,
  })
  @IsOptional()
  @IsBase64()
  arquivo?: string;
}

