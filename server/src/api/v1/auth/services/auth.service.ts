// src/auth/auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { User } from '../../users/schemas/user.schema';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async register(user: User): Promise<User> {
    const { email, password } = user;

    if (!email || !password) {
      throw new BadRequestException('User ID and Password required');
    }
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser = { ...user, password: hashedPassword };

    return this.usersService.create(newUser);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersService.findOneByEmail(email);
  }
}
