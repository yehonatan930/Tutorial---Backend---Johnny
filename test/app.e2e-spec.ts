import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { assert } from 'console';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/templates')
      .expect(200)
      .expect([]);
  });

  it('/ (Add Template)', (done) => {
    let id = -1;
    return request(app.getHttpServer())
      .post('/templates')
      .send({ TemplateArg1: 'Harry Potter', TemplateArg2: 'J.K. Rowling' })
      .set('Accept', 'application/json')
      .expect(201)
      .then((response) => {
        id = response.body.id;
      })
      .then(() => {
        return request(app.getHttpServer())
          .get('/templates/' + id)
          .expect(200)
          .then((resp) => {
            assert(
              resp.body.TemplateArg1 === 'Harry Potter',
              "the template's first arg is wrong",
            );
            assert(
              resp.body.TemplateArg2 === 'J.K. Rowling',
              "the template's second arg is wrong",
            );
            done();
          })
          .catch((err) => done(err));
      });
  });
});
