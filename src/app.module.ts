import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';

@Module({
  imports: [ // responsável por criar a conexão com o branco de dados
    TypeOrmModule.forRoot({
      type: 'mysql', // tipo de banco de dados
      host: 'localhost',
      port: 3306, // porta de entrada q o mysql utiliza
      username:'root', // em produção cria-se um usuário específico com direitos limitados apenas para o que a produção vai precisar
      password: 'A0m1a4n7d0a0',
      database: 'db_blogpessoal', // nome do banco de dados q vc precisa criar no mysql antes de inserir aqui
      entities: [Postagem], // adc as entidades que vamos usar 
      synchronize: true, // cria a sincronização com o banco de dados, se tiver alguma alteração nas tabelas, ele atualiza sozinho
      logging: true, // faz vc visualizar o que ta acontecendo// não usa em produção, somente no desenvolvimento
    }),
    PostagemModule, // é a classe que vai definir o recurso, vamos registrar todas as classes que vai compor o recurso (postagem, postagem service e controller), so acrescenta aqui dps de criar a postagem module.
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
