import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.senha, 10);
    if (
      [dto.empresaId, dto.funcionarioId, dto.medicoId].filter(Boolean).length > 1
    ) {
      throw new BadRequestException('Usuário só pode ter uma role associada.');
    }
    
    return this.prisma.user.create({
      data: {
        email: dto.email,
        senha: hashedPassword,
        role: dto.role,
        empresaId: dto.empresaId,
        funcionarioId: dto.funcionarioId,
        medicoId: dto.medicoId,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        empresa: true,
        funcionario: true,
        medico: true,
      },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        empresa: true,
        funcionario: true,
        medico: true,
      },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      nome:
        user.funcionario?.nome ||
        user.medico?.nome ||
        user.empresa?.nome ||
        null,
    }));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        empresa: true,
        funcionario: true,
        medico: true,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return {
      ...user,
      nome:
        user.funcionario?.nome ||
        user.medico?.nome ||
        user.empresa?.nome ||
        null,
    };
  }
}
