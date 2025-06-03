import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
@Schema({
  versionKey: false,
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop({ unique: [true, 'This email is already in use.'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop({ enum: Gender, required: true })
  gender: Gender;
}

export const UserSchema = SchemaFactory.createForClass(User);
