import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from 'app/app.controller';
import { AppService } from 'app/app.service';
import { MESSAGES } from 'consts';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe(MESSAGES.HELLO_GREETINGS);
    });
  });
});
