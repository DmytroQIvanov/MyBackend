import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService, JwtService, AuthService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/user/profile');
  }
}
