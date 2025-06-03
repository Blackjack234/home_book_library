import { Category } from '../schema/books.schema';

export class CreateDto {
  readonly title: string;
  readonly description: string;
  readonly category: Category;
  readonly price: number;
  readonly author: string;
}
