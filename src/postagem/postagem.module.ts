import { Module } from "@nestjs/common";
import { Postagem } from "./entities/postagem.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
import { TemaModule } from "../tema/tema.module";
import { TemaService } from "../tema/services/tema.service";


@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], // ele cria a repository que utilizamos para interargir com o banco
    providers: [PostagemService, TemaService], // onde está definido as regras da aplicação
    controllers: [PostagemController], // classe que é a porta de entrada da aplicação, todas as requisições de postagem é ela q controla
    exports: [TypeOrmModule]
})

export class PostagemModule { }