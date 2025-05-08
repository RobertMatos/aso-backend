import { IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FilterFuncionarioDto {
  @ApiProperty({
    description: 'Filtro de pesquisa para nome ou CPF do funcionário',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'ID da empresa para filtrar os funcionários',
    required: false,
    type: String,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  empresaId?: string;

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
