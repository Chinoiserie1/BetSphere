// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    address: string,
    message: string,
    signature: string,
  ): Promise<any> {
    const messageHash = ethers.utils.hashMessage(message);
    const signerAddress = ethers.utils.recoverAddress(messageHash, signature);

    if (signerAddress.toLowerCase() !== address.toLowerCase()) {
      return null;
    }

    const user = await this.userService.findOne(address);
    if (user) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { address: user.address, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
