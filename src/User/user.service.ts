import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { userProviders } from './user.providers';
import { User } from './User.entity';
import { createUserDto, findUserDto } from '../DTOs/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOne(email): Promise<User> {
    let user;
    try {
      user = await this.userRepository.findOne({ where: { email: email } });
    } catch {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async findOneById(id): Promise<any> {
    let user;
    try {
      user = await this.userRepository.findOne({ where: { id } });
    } catch {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    }
    const { password, ...userData } = user;
    return { user: userData };
  }

  async createUser(userDto: createUserDto): Promise<User> {
    if (!userDto.email || !userDto.password || !userDto.username) return;

    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(userDto.password, saltOrRounds);

    const user = await this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    const resultUser = await this.userRepository.save(user);
    return user;
  }
}
