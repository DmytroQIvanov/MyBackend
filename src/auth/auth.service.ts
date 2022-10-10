import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../User/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import * as bcrypt from 'bcrypt';
import { loginUserDto } from '../DTOs/user.dto';
import { User } from '../User/User.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,

    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: loginUserDto): Promise<any> {
    if (!email && !password)
      throw new HttpException('Validate', HttpStatus.BAD_REQUEST);
    const user = await this.userService.findOne(email);

    if (user && user.password) {
      // const hash = await bcrypt.compare(user.password, password);
      const hash = await bcrypt.compare(password, user.password);
      console.log('hash', hash);
      console.log('password', password);
      console.log('user.password', user.password);
      if (hash) {
        const { password, ...result } = user;
        return result;
      }
      throw new BadRequestException('Password incorrect');
      return null;
    }
    return null;
  }
  verifyToken({ token }) {
    let result;
    console.log('token2', token);

    try {
      result = this.jwtService.verify(token, { secret: jwtConstants.secret });
    } catch (e) {
      console.log(e);
      throw new HttpException('Forbidden2', HttpStatus.FORBIDDEN);
    }
    return result;
  }

  async refreshToken({ token }) {
    let result;
    let user;
    console.log(token, 'token');
    try {
      result = this.jwtService.verify(token);
      user = await this.userService.findOneById(result.id);
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    if (result) {
      const payload = { username: result.email, sub: result.id };
      return {
        access_token: this.jwtService.sign(payload),
        user,
      };
    }
    return result;
  }
  login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
