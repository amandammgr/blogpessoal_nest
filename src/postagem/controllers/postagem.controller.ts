import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller("/postagens")
export class PostagemController{

    constructor(private readonly postagemService: PostagemService){}

    @Get()
    @HttpCode(HttpStatus.OK) // http status 200 (indica q deu certo)
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }
    
}