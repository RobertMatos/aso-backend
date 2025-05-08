import { IsOptional, IsString, IsInt, Min, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FilterAtestadoDto {
  @ApiProperty({
    description: 'Filtro de pesquisa pela descrição do atestado',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'ID do exame relacionado',
    required: false,
    type: String,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  exameId?: string;

  @ApiProperty({
    description: 'Número da página de resultados',
    required: false,
    type: Number,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Número de resultados por página',
    required: false,
    type: Number,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
