import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  use(req, res: Response, next: NextFunction) {
    console.log(req);
    const token = req.cookies['Authentication'];
    if (!token) throw new HttpException('Forbidden1', HttpStatus.FORBIDDEN);

    console.log('token', token);
    const userData = this.authService.verifyToken({ token });

    req.user = userData;
    console.log('Request...');
    next();
  }
}
