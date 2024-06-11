import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    address: string;
    points?: bigint;
    role?: string;
  }): Promise<User> {
    if (this.findOne(data.address)) throw new Error('User already exists');
    return this.prisma.user.create({
      data: {
        address: data.address,
        points: data.points || 0n,
        role: data.role || 'user',
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(address: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { address },
    });
  }

  // async updatePoints(address: string, points: bigint): Promise<User> {
  //   return this.prisma.user.update({
  //     where: { address },
  //     data: { points },
  //   });
  // }

  async delete(address: string): Promise<User> {
    return this.prisma.user.delete({
      where: { address },
    });
  }
}
