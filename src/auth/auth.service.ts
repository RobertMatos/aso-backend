// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async validateUser(email: string, senha: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return user;
  }

  async login(email: string, senha: string) {
    const user = await this.validateUser(email, senha);

    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
