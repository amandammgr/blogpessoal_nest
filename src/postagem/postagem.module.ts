import { Module } from "@nestjs/common";
import { Postagem } from "./entities/postagem.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Postagem])], // ele cria a repository que utilizamos para interargir com o banco
    providers: [PostagemService], // onde está definido as regras da aplicação
    controllers: [PostagemController], // classe que é a porta de entrada da aplicação, todas as requisições de postagem é ela q controla
    exports: [TypeOrmModule]
})

export class PostagemModule { }