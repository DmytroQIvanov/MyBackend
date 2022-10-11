import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get('profile/:id')
  async getProfile(@Param('id') id) {
    return await this.userService.findOneById(id);
  }
  @Get('profile')
  async getAccountProfile(@Req() request) {
    console.log(request.user);
    return await this.userService.findOneById(request.user.sub);
  }
}
