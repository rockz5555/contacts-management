import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(user: User): Promise<UserDocument> {
    const createdUser = new this.userModel(user);

    return createdUser.save({ validateBeforeSave: false });
  }

  async update(user: User): Promise<UserDocument> {
    return this.userModel
      .findOneAndUpdate({ email: user.email }, user, { new: true })
      .select({ password: 0 })
      .exec();
  }
}
