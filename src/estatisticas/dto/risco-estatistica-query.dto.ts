import { IsOptional, IsUUID, IsEnum, IsDateString, IsInt, Min } from 'class-validator';
import { TipoExame } from '@prisma/client';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RiscoEstatisticaQueryDto {
  @ApiPropertyOptional({
    description: 'ID da empresa (opcional)',
    type: String,
  })
  @IsOptional()
  @IsUUID()
  empresaId?: string;

  @ApiPropertyOptional({
    description: 'Tipo de exame (opcional)',
    enum: TipoExame, // Enum do Prisma
    type: String,
  })
  @IsOptional()
  @IsEnum(TipoExame)
  tipoExame?: TipoExame;

  @ApiPropertyOptional({
    description: 'Data de início (opcional)',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @ApiPropertyOptional({
    description: 'Data de fim (opcional)',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  dataFim?: string;

  @ApiPropertyOptional({
    description: 'Página para paginação (opcional)',
    type: Number,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Limite de itens por página (opcional)',
    type: Number,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
