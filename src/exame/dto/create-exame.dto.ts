import {
  IsUUID,
  IsEnum,
  IsDateString,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TipoExame, ResultadoAtestado } from '@prisma/client';

export class CreateExameDto {
  @ApiProperty({
    description: 'Tipo do exame',
    enum: TipoExame,
    enumName: 'TipoExame', // Melhor para o Swagger
  })
  @IsEnum(TipoExame)
  tipo: TipoExame;

  @ApiProperty({
    description: 'Data de realização do exame',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  dataRealizacao: string;

  @ApiProperty({
    description: 'ID do funcionário associado ao exame',
    type: String,
    format: 'uuid',
  })
  @IsUUID()
  funcionarioId: string;

  @ApiProperty({
    description: 'ID do médico associado ao exame (opcional)',
    required: false,
    type: String,
    format: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  medicoId?: string;

  @ApiProperty({
    description: 'Resultado do atestado',
    enum: ResultadoAtestado,
    enumName: 'ResultadoAtestado', // Melhor para o Swagger
  })
  @IsEnum(ResultadoAtestado)
  resultado: ResultadoAtestado;

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
