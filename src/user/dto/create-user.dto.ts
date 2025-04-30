import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client'; // Importando a enum Role do Prisma

export class CreateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    type: String,
  })
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiProperty({
    description: 'Função do usuário',
    enum: Role,
  })
  @IsEnum(Role) // Valida que o valor de role deve ser um valor da enum Role
  role: Role;

  @ApiProperty({
    description: 'ID da empresa associada (opcional)',
    required: false,
    type: String,
  })
  @ValidateIf((o) => o.role === 'ADMIN' || o.role === 'USER') // Apenas se o role for ADMIN ou USER
  @IsOptional()
  @IsString()
  empresaId?: string;

  @ApiProperty({
    description: 'ID do funcionário associado (opcional)',
    required: false,
    type: String,
  })
  @ValidateIf((o) => o.role === 'FUNCIONARIO') // Apenas se o role for FUNCIONARIO
  @IsOptional()
  @IsString()
  funcionarioId?: string;

  @ApiProperty({
    description: 'ID do médico associado (opcional)',
    required: false,
    type: String,
  })
  @ValidateIf((o) => o.role === 'MEDICO') // Apenas se o role for MEDICO
  @IsOptional()
  @IsString()
  medicoId?: string;
}
