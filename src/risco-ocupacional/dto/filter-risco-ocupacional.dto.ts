import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class FilterRiscoOcupacionalDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
