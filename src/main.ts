import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'; // configuramos o fuso horário, ajustamos para ficar no horário de brasília

  app.useGlobalPipes(new ValidationPipe()); // habilitamos a biblioteca de validação dos dados, que valida os dados antes de inserir no banco de dados

  app.enableCors(); //habilitamos requisições de outros servidores// se não ativar o cors, nao consegue enviar solicitações do front para o backend

  await app.listen(4000); // alteramos a porta de entrada de 3000 para 4000
}
bootstrap();
