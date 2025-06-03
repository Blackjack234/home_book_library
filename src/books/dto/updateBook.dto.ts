import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../schema/books.schema';

export class updateDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;
}
