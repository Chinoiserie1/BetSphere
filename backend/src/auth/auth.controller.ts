// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const { address, message, signature } = body;
    const user = await this.authService.validateUser(
      address,
      message,
      signature,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
}
