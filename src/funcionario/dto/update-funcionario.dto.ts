import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionarioDto } from './create-funcionario.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusFuncionario } from '@prisma/client';

export class UpdateFuncionarioDto extends PartialType(CreateFuncionarioDto) {
  @ApiPropertyOptional({
    description: 'Nome do funcionário',
    type: String,
  })
  nome?: string;

  @ApiPropertyOptional({
    description: 'CPF do funcionário',
    type: String,
  })
  cpf?: string;

  @ApiPropertyOptional({
    description: 'Telefone do funcionário',
    type: String,
  })
  telefone?: string;

  @ApiPropertyOptional({
    description: 'Status do funcionário',
    enum: StatusFuncionario, // Supondo que StatusFuncionario seja uma enum do Prisma
    type: String,
  })
  status?: StatusFuncionario;

  @ApiPropertyOptional({
    description: 'ID da empresa à qual o funcionário pertence',
    type: String,
  })
  empresaId?: string;
}
