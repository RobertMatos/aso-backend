import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Libera CORS para todas as origens
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
  app.getHttpAdapter().getInstance().get('/healthz', (_req, res) => res.sendStatus(200));
    
  const portEnv = process.env.PORT;
  const port = portEnv ?? '3000';
  await app.listen(+port, '0.0.0.0');
  console.log(`API rodando em 0.0.0.0:${port}`);
}
bootstrap();
