import {
  IsUUID,
  IsEnum,
  IsDateString,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TipoExame, ResultadoAtestado } from '@prisma/client';

export class UpdateExameDto {
  @ApiProperty({
    description: 'Tipo do exame (opcional)',
    enum: TipoExame,
    required: false,
  })
  @IsEnum(TipoExame)
  @IsOptional()
  tipo?: TipoExame;

  @ApiProperty({
    description: 'Data de realização do exame (opcional)',
    type: String,
    format: 'date-time',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  dataRealizacao?: string;

  @ApiProperty({
    description: 'ID do funcionário associado ao exame (opcional)',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  funcionarioId?: string;

  @ApiProperty({
    description: 'ID do médico associado ao exame (opcional)',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  medicoId?: string;

  @ApiProperty({
    description: 'Resultado do atestado (opcional)',
    enum: ResultadoAtestado,
    required: false,
  })
  @IsEnum(ResultadoAtestado)
  @IsOptional()
  resultado?: ResultadoAtestado;

  @ApiProperty({
    description: 'Lista de IDs de riscos associados ao exame (opcional)',
    required: false,
    type: [String],
    format: 'uuid',
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  riscos?: string[];
}
