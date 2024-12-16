import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from 'app/app.module';
import { MESSAGES, ROUTES } from 'consts';

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
    return request
      .default(app.getHttpServer())
      .get(ROUTES.ROOT)
      .expect(HttpStatus.OK)
      .expect(MESSAGES.HELLO_GREETINGS);
  });
});
