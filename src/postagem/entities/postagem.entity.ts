import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
// criando o nome da tabela tb_postagens pro mysql nao criar com o nome de postagem
@Entity({name: "tb_postagens"}) // criando a tabela
export class Postagem{ // se nao colocar um nome, ele cria a tabela com o nome da entidade (Postagem)

    @PrimaryGeneratedColumn() // Chave primária autoincremental
    id: number; // o atributo tem q ficar logo embaixo para nao dar erro

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Bloquear apenas espaços em branco
    @IsNotEmpty() // isso obriga a nao deixar o titulo vazio, tem q digitar algo
    @Column({length: 100, nullable: false}) // definir o tamanho e não aceitar valor nulo
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn() // a data e a hora serão preenchidas automaticamente
    data: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;

}