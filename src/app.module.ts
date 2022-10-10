import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './User/user.service';
import { userProviders } from './User/user.providers';
import { User } from './User/User.entity';
import { UserModule } from './User/user.module';
import { databaseProviders } from './database/database.providers';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,

      signOptions: { expiresIn: '6000s' },
    }),

    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: 'schema.gql',
    // }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   debug: false,
    //   playground: true,
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'ec2-176-34-215-248.eu-west-1.compute.amazonaws.com',
    //   port: 5432,
    //   username: 'almhiwvhqduwmb',
    //   password:
    //     'fff18658b86daa2491975b668ec0ce63f08b9028fb03b8029cde829c15137e5b',
    //   database: 'd603e3nfplmmgb',
    //   // entities: ['dist/**/*.model.js'],
    //   synchronize: true,
    //   ssl: false,
    //   autoLoadEntities: true,
    //   entities: [User],
    //   extra: {
    //     ssl: {
    //       rejectUnauthorized: false,
    //     },
    //   },
    // }),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    UserService,
    ...userProviders,
    ...databaseProviders,
  ],
})
export class AppModule {}
