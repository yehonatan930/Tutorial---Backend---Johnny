import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { assert } from 'console';

/**
 * this file is responsible for end to end testing, when this is executed it creates and instance of the
 * app and makes some request to it.
 */
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
      .get('/') //make a request to the app on '/'
      .expect(200) //what status code to expect
      .expect('Hello World!'); // what content to expect.
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/templates') //make request for '/template'
      .expect(200); //what status code to expect
  });

  /**
   * test for adding an entity, add an entity than checks if is indeed was added.
   */
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
