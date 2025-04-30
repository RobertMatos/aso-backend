import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoDto } from './create-medico.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicoDto extends PartialType(CreateMedicoDto) {
  @ApiProperty({
    description: 'Nome do médico',
    type: String,
    required: false,  // Indica que este campo é opcional
  })
  nome?: string;

  @ApiProperty({
    description: 'CRM do médico',
    type: String,
    required: false,
  })
  crm?: string;

  @ApiProperty({
    description: 'Telefone do médico',
    type: String,
    required: false,
  })
  telefone?: string;

  @ApiProperty({
    description: 'Email do médico',
    type: String,
    required: false,
  })
  email?: string;
}
