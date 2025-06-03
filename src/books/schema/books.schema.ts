import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Category {
  Adventure = 'adventure',
  Fantacy = 'fantacy',
  Crime = 'crime',
  Action = 'action',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Book extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ enum: Category, required: true })
  category: Category;

  @Prop()
  author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
