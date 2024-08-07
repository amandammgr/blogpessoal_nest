import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuario e Auth (e2e)', () => {
  let app: INestApplication;
  let token: any;
  let usuarioId: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("01 - Deve cadastrar um novo usuario", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(201);

    usuarioId = resposta.body.id;

  })

  it("02 - Não deve cadastrar um usuario duplicado", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(400);

  })

  it("03 - Deve autenticar um usuario (Login)", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      })
      .expect(200);

    token = resposta.body.token;
    
  })

  it("04 - Deve listar todos os usuario", async () => {
    await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .expect(200);

  })

  it("05 - Deve atualizar os dados do usuario", async () => {
    await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Administrador do Sistema',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: 'foto.jpg',
      })
      .expect(200)
      .then(resposta => {
        expect("Administrador do Sistema").toEqual(resposta.body.nome);
      });
  })

  it("06 - Deve Listar apenas um Usuário pelo id", async () => {
    return request(app.getHttpServer())
      .get(`/usuarios/${usuarioId}`)
      .set('Authorization', `${token}`)
      .send({})
      .expect(200)
  })
});
// npm run test:e2e //