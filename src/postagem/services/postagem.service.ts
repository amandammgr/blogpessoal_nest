import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TemaService } from "../../tema/services/tema.service";

@Injectable() //indica que é uma classe de serviço
export class PostagemService{
    uptade(postagem: Postagem): Promise<Postagem> {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(Postagem) // cria uma injeção de dependencia (transferência de responsabilidade), cria, instancia e manipula o objeto usando a interface repository
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ) {}
// metodo async continua fazendo o funcionamento em segundo plano e quando houver uma resposta ele mostra
    async findAll(): Promise<Postagem[]>{ // metodo de busca q possibilita buscar tudo ou fazer especificações colocando entre () e mudar o nome de findAll para findBy o que vc quer
        // SELECT * FROM tb_postagens; a linha 16 é o equivalente a esse comando no banco de dados
        return await this.postagemRepository.find({
            relations:{
                tema: true
            }
        }); // await pede pra jogar pra segundo plano até vir a resposta, tem que colocar sempre
    }     // promise tem 3 estados, pendente, resolvida e rejeitada, ela tenta cumprir a função, mas se ela nao conseguir cumprir a função, ela vai ser rejeitada

    async findById(id: number): Promise<Postagem>{

        let buscaPostagem = await this.postagemRepository.findOne({
            where:{
                id
            },
            relations:{
                tema: true
            }
        })

        if(!buscaPostagem)
            throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND);

        return buscaPostagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]>{

        return await this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`) // ILike é menos sensitivel, então tanto faz se o titulo for maiusculo ou minusculo
            },
            relations:{
                tema: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {

        if(postagem.tema){
            let tema = await this.temaService.findById(postagem.tema.id)

            if (!tema)
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

            return await this.postagemRepository.save(postagem);
        }

        return await this.postagemRepository.save(postagem);

    }

    async update(postagem: Postagem): Promise<Postagem> { // ele atualiza tudo, então se quiser manter o msm texto por exemplo, copia e cola o msm
        let buscaPostagem = await this.findById(postagem.id);
        if(!buscaPostagem || !postagem.id)
            throw new HttpException('A postagem não foi encontrada!', HttpStatus.NOT_FOUND);

        if (postagem.tema){

            let tema = await this.temaService.findById(postagem.tema.id)

            if (!tema)
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

            return await this.postagemRepository.save(postagem);
        }

        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult>{

        let buscaPostagem = await this.findById(id)

        if(!buscaPostagem)
            throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND);

        return await this.postagemRepository.delete(id);
        
    }


}