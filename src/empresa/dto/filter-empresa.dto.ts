import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FilterEmpresaDto {
  @ApiProperty({
    description: 'Filtro de pesquisa para o nome da empresa',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string;

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
