import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import 'dotenv/config';

import { join } from 'path';

import { AuthController } from './api/v1/auth/auth.controller';
import { AuthService } from './api/v1/auth/services/auth.service';
import { UsersModule } from './api/v1/users/users.module';
import { MONGODB_URL } from './constants';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
