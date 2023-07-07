import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Basic Details
  @Prop()
  profileImage: string;

  @Prop({ required: true })
  salutation: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  // Additional Details
  @Prop({ required: true })
  mobileNumber: string;

  @Prop({ required: true })
  homeAddress: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  nationality: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  gender: string;

  @Prop()
  maritalStatus: string;

  // Spouse Details
  @Prop()
  spouseSalutation: string;

  @Prop()
  spouseFirstName: string;

  @Prop()
  spouseLastName: string;

  // Personal Preferences
  @Prop()
  hobbiesAndInterests: string[];

  @Prop()
  favoriteSports: string[];

  @Prop()
  preferredMusicGenres: string[];

  @Prop()
  preferredMoviesAndTVShows: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
