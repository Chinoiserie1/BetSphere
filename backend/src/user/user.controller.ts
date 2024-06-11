import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() data: { address: string; points?: bigint; role?: string },
  ): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':address')
  async findOne(@Param('address') address: string): Promise<User | null> {
    return this.userService.findOne(address);
  }

  // @Put(':address')
  // async updatePoints(
  //   @Param('address') address: string,
  //   @Body() points: BigInt,
  // ): Promise<User> {
  //   return this.userService.update(address, data);
  // }

  @Delete(':address')
  async delete(@Param('address') address: string): Promise<User> {
    return this.userService.delete(address);
  }
}
