import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { AuthorizationGuard } from '../guards/authorization/authorization.guard';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createOne(user);
  }

  @UseGuards(AuthorizationGuard)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Get(':uuid')
  getUserByEmail(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @UseGuards(AuthorizationGuard)
  @Put(':uuid')
  updateUser(@Param('uuid') uuid: string, @Body() data: any) {
    return this.usersService.updateOne(uuid, data);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':uuid')
  deleteUser(@Param('uuid') uuid: string) {
    return this.usersService.deleteOne(uuid);
  }
}
