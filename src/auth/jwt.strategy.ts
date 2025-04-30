import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extrai o token do cabeçalho Authorization
      ignoreExpiration: false,  // Não ignora a expiração
      secretOrKey: process.env.JWT_SECRET || 'segredo123',  // A chave secreta para validar o JWT
    });
  }

  async validate(payload: any) {
    // Aqui você pode retornar informações do usuário, sem a necessidade de roles, como:
    return { userId: payload.sub, email: payload.email };  // Apenas id e email, sem roles
  }
}
