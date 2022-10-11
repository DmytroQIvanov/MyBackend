import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from '../app.service';
import { createUserDto, loginUserDto } from '../DTOs/user.dto';
import { UserService } from '../User/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/sign-up')
  async signUp(@Body() body: createUserDto) {
    console.log(body);
    return await this.userService.createUser(body);
  }

  @Post('/login')
  async login(
    @Body() body: loginUserDto,
    @Res({ passthrough: true }) response,
  ) {
    if (!body.password || !body.email) {
      throw new HttpException(
        'Incorrect login or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(body);
    const user = await this.authService.validateUser({ ...body });
    if (user) {
      const authResponse = await this.authService.login(user);

      // response.cookie('Authentication', `Bearer ${authResponse.access_token}`);
      response.cookie('Authentication', `${authResponse.access_token}`);
    } else {
      throw new NotFoundException('Incorrect login or password');
    }
    return user;
  }
  @Post('/refreshToken')
  async refreshToken(@Req() request, @Res({ passthrough: true }) response) {
    console.log('cookies', request.cookies['Authentication']);
    console.log(request.cookies);

    const newToken = await this.authService.refreshToken({
      token: request.cookies['Authentication'],
    });
    response.cookie('Authentication', `${newToken.access_token}`);

    return newToken;
    // const user = await this.authService.validateUser({ ...body });
    // if (user) {
    //   return await this.authService.login(user);
    // }
  }
  @Get('/logout')
  async userLogout(@Res({ passthrough: true }) response) {
    response.cookie('Authentication', ``);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
