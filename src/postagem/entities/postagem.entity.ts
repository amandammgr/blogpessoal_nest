import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// criando o nome da tabela tb_postagens pro mysql nao criar com o nome de postagem
@Entity({name: "tb_postagens"}) // criando a tabela
export class Postagem{

    @PrimaryGeneratedColumn() // Chave primária autoincremental
    id: number; // o atributo tem q ficar logo embaixo para nao dar erro

    @IsNotEmpty() // isso obriga a nao deixar o titulo vazio, tem q digitar algo
    @Column({length: 100, nullable: false}) // definir o tamanho e não aceitar valor nulo
    titulo: string;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn() // a data e a hora serão preenchidas automaticamente
    data: Date;

}