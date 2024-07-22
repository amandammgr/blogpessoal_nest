import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() //indica que é uma classe de serviço
export class PostagemService{

    constructor(
        @InjectRepository(Postagem) // cria uma injeção de dependencia (transferência de responsabilidade), cria, instancia e manipula o objeto usando a interface repository
        private postagemRepository: Repository<Postagem>
    ) {}

    async findAll(): Promise<Postagem[]>{
        // SELECT * FROM tb_postagens; a linha 16 é o equivalente a esse comando no banco de dados
        return await this.postagemRepository.find();
    }
}