import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { createServer, proxy } from 'aws-serverless-express';
import { Handler } from 'aws-lambda';

const expressApp = express();
let cachedServer: Handler;

async function bootstrapServer(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.enableCors();

  // Rota básica para health check e validação
  expressApp.get('/', (_req, res) => res.send('✅ NestJS Serverless ativo'));
  expressApp.get('/healthz', (_req, res) => res.sendStatus(200));

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
