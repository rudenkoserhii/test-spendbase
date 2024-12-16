import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from 'app/app.service';
import { DESCRIPTIONS, MESSAGES, ROUTES, SWAGGER } from 'consts';
import { GREETINGS } from 'types';

@ApiTags(SWAGGER.APP.CONTROLLER.TAGS)
@Controller(ROUTES.ROOT)
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @desc Handles the GET request for the root endpoint and returns a greeting message.
   * @returns {string} - A greeting message "Hello, World!" fetched from the AppService.
   */  
  @Get(ROUTES.ROOT)
    @ApiOperation({ summary: SWAGGER.APP.CONTROLLER.GET_GRRETINGS })
    @ApiResponse({ status: HttpStatus.OK, description: DESCRIPTIONS.GREETINGS })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MESSAGES.NOT_FOUND })
  getHello(): GREETINGS {
    return this.appService.getHello();
  }
}
