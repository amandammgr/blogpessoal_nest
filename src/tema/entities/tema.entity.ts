import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity({name: "tb_temas"}) // criando a tabela
export class Tema {

@PrimaryGeneratedColumn() // chave primaria autoincremental
@ApiProperty()
id: number; // atributo da chave primaria

@IsNotEmpty()
@Column({length: 255, nullable: false})
@ApiProperty()
descricao: string;

@ApiProperty()
@OneToMany(() => Postagem, (postagem) => postagem.tema)
postagem: Postagem[]







}