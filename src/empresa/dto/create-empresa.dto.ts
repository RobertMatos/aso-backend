import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmpresaDto {
  @ApiProperty({
    description: 'Nome da empresa',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'CNPJ da empresa',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @ApiProperty({
    description: 'Telefone da empresa',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  telefone: string;

  @ApiProperty({
    description: 'Email de contato da empresa',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
