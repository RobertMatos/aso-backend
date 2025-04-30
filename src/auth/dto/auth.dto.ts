import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
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
}
