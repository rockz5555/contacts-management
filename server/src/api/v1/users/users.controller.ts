import { existsSync, mkdirSync } from '@cyclic.sh/s3fs';
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { User } from './schemas/user.schema';
import { UsersService } from './services/users.service';

@Controller('users')
export class UsersController {
  private readonly uploadFolderPath: string = './uploads';

  constructor(private usersService: UsersService) {
    this.createUploadsFolder();
  }

  @Post('getByEmail')
  @HttpCode(HttpStatus.OK)
  async getUser(@Body() body: { email: string }): Promise<User> {
    const user = await this.usersService.findOneByEmail(body.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, `${uniqueName}${extension}`);
        },
      }),
      fileFilter: (_, file, callback) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = extname(file.originalname);
        if (allowedExtensions.includes(ext.toLowerCase())) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type.'), false);
        }
      },
      limits: {
        fileSize: 1024 * 1024,
      },
    }),
  )
  async updateUserWithImage(
    @UploadedFile() profileImage: Express.Multer.File,
    @Body() user: User,
  ): Promise<User> {
    const modUser = JSON.parse(JSON.stringify(Object.assign({}, user)));
    const newUserObj: User = JSON.parse(modUser['user']);

    newUserObj.profileImage = profileImage?.path && profileImage.path;
    delete newUserObj['_id'];
    delete newUserObj['password'];

    if (!newUserObj.email) {
      throw new BadRequestException('Email must be provided');
    }
    const updatedUser = await this.usersService.update(newUserObj);

    if (!updatedUser) {
      throw new ForbiddenException('User was not found');
    }
    return updatedUser;
  }

  @Patch()
  async updateUser(@Body() user: User): Promise<User> {
    if (!user?.email) {
      throw new BadRequestException('Email must be provided');
    }
    const updatedUser = await this.usersService.update(user);

    if (!updatedUser) {
      throw new ForbiddenException('User was not found');
    }
    return updatedUser;
  }

  private createUploadsFolder() {
    if (!existsSync(this.uploadFolderPath)) {
      mkdirSync(this.uploadFolderPath);
    }
  }
}
