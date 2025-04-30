import { IsUUID, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { StatusFuncionario } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuncionarioDto {
  @ApiProperty({
    description: 'Nome do funcionário',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'CPF do funcionário',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    description: 'Telefone do funcionário',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @ApiProperty({
    description: 'Status do funcionário',
    enum: StatusFuncionario, // Supondo que StatusFuncionario seja uma enum do Prisma
    type: String,
  })
  @IsEnum(StatusFuncionario)
  status: StatusFuncionario;

  @ApiProperty({
    description: 'ID da empresa à qual o funcionário pertence',
    type: String,
  })
  @IsUUID()
  empresaId: string;
}
