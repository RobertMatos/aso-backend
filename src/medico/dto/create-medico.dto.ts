import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicoDto {
  @ApiProperty({
    description: 'Nome do médico',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'CRM do médico',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  crm: string;

  @ApiProperty({
    description: 'Telefone do médico',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @ApiProperty({
    description: 'Email do médico',
    type: String,
  })
  @IsEmail()
  email: string;
}
