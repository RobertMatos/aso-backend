import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRiscoOcupacionalDto {
  @ApiProperty({
    description: 'Nome do risco ocupacional',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nome: string;
}
