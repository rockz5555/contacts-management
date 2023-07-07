// src/auth/auth.controller.ts
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from '../users/schemas/user.schema';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: User): Promise<{ message: string }> {
    const validatedUser = await this.authService.login(
      user.email,
      user.password,
    );

    if (validatedUser) {
      return { message: 'Login successful' };
    }
    throw new UnauthorizedException(
      'Your user ID and/or password does not match',
    );
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: User): Promise<{ message: string }> {
    const existingUser = await this.authService.findUserByEmail(user.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    await this.authService.register(user);

    return { message: 'User registered successfully. Now please login' };
  }
}
