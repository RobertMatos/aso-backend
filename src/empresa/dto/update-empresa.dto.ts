import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaDto } from './create-empresa.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) {
  @ApiProperty({
    description: 'Nome da empresa',
    required: false,
    type: String,
  })
  nome?: string;

  @ApiProperty({
    description: 'CNPJ da empresa',
    required: false,
    type: String,
  })
  cnpj?: string;

  @ApiProperty({
    description: 'Telefone da empresa',
    required: false,
    type: String,
  })
  telefone?: string;

  @ApiProperty({
    description: 'Email da empresa',
    required: false,
    type: String,
  })
  email?: string;
}
