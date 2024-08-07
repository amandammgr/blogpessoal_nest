import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Amanda Machado Magro","https://github.com/amandammgr/blogpessoal_nest","amandamachadomgr@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'; // configuramos o fuso horário, ajustamos para ficar no horário de brasília

  app.useGlobalPipes(new ValidationPipe()); // habilitamos a biblioteca de validação dos dados, que valida os dados antes de inserir no banco de dados

  app.enableCors(); //habilitamos requisições de outros servidores// se não ativar o cors, nao consegue enviar solicitações do front para o backend

  await app.listen(process.env.PORT || 4000); // alteramos a porta de entrada de 3000 para 4000
}
bootstrap();
