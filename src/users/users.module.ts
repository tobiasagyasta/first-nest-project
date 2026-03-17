import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { loggerMiddleware } from 'src/common/middleware/logger.middleware';
import { requestTrackingMiddleware } from 'src/common/middleware/request-tracking.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule implements NestModule {
  //user punya request id
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requestTrackingMiddleware).forRoutes(UsersController);
    consumer.apply(loggerMiddleware).forRoutes(UsersController);
  }
}
