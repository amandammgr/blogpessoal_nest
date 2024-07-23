import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller("/postagens")
export class PostagemController{

    constructor(private readonly postagemService: PostagemService){}

    @Get()
    @HttpCode(HttpStatus.OK) // http status 200 (indica q deu certo)
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll(); // ta chamando o método que esta na service, pq na service está os metodos criados na module para interagir com o mysql
    }
    
    @Get('/:id') // definindo que esse elemento vai ser uma variável, aqui você passa o nº do ID que quer: http://localhost:4000/postagens/:1 por exemplo
    @HttpCode(HttpStatus.OK) 
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{ // o @Param ta mostrando q a variavel id deve ser convertida para inteiro e atrelada a variavel id q é paramentro do metodo findById, e o ParseIntPipe é para converter o string para number
        return this.postagemService.findById(id); 
    }

    @Get('/titulo/:titulo') 
    @HttpCode(HttpStatus.OK) 
    findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findByTitulo(titulo); 
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) // http status 201 // usamos esse quando vamos criar alguma coisa
    create(@Body() postagem: Postagem): Promise<Postagem>{ // atraves do body vai pegar o objeto postagem atraves do corpo da requisição através do json e transforma em objeto
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK) // http status 200 
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem);
}

@Delete('/:id') // metodo deletar
    @HttpCode(HttpStatus.NO_CONTENT) // Http Status 204
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id); 
    }
}