import { Injectable } from '@nestjs/common';

import { MESSAGES } from 'consts';

@Injectable()
export class AppService {

  /**
   * @desc Returns a greeting message.
   * @returns {string} The greeting message, which is "Hello, World!".
   */  
  getHello(): string {
    return MESSAGES.HELLO_GREETINGS;
  }
}
