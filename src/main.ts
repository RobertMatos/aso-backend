import express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createServer, proxy } from 'aws-serverless-express';
import { Handler } from 'aws-lambda';

const expressApp = express();

let cachedServer: Handler;

async function waitForDb(ms = 1000, retries = 10): Promise<void> {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      await prisma.$disconnect();
      console.log('✅ Banco conectado com sucesso.');
      return;
    } catch (err) {
      console.warn(`⏳ Aguardando banco... Tentativa ${i + 1}/${retries}`);
      await new Promise(res => setTimeout(res, ms));
    }
  }
  throw new Error('❌ Banco não respondeu a tempo.');
}

async function bootstrapServer(): Promise<Handler> {
  await waitForDb(); // Espera o banco iniciar

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Minha API')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'jwt-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init();

  return createServer(expressApp);
}

export const handler = async (event: any, context: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
