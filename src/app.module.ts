import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpresaModule } from './empresa/empresa.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { ExameModule } from './exame/exame.module';
import { MedicoModule } from './medico/medico.module';
import { AtestadoModule } from './atestado/atestado.module';
import { RiscoOcupacionalModule } from './risco-ocupacional/risco-ocupacional.module';
import { PrismaModule } from '../prisma/prisma.module';
import { EstatisticasModule } from './estatisticas/estatisticas.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EmpresaModule, FuncionarioModule, ExameModule, MedicoModule, AtestadoModule, RiscoOcupacionalModule, PrismaModule, EstatisticasModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
