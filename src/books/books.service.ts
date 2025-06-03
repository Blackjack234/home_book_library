import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/books.schema';
import mongoose from 'mongoose';
import { CreateDto } from './dto/createBook.dto';
import { updateDto } from './dto/updateBook.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: mongoose.Model<Book>,
  ) {}

  async findAllBook(): Promise<Book[] | null> {
    try {
      const result = await this.bookModel.find();

      if (!result) {
        return null;
      }
      return result;
    } catch (e) {
      throw new Error(`Failed to fetch Books ${e?.message}`);
    }
  }

  async findBooksById(id: string): Promise<Book | null> {
    try {
      const result = await this.bookModel.findById({ _id: id });

      if (!result) {
        return null;
      }

      return result;
    } catch (e) {
      throw new Error(`somthing went wrong ${e.message}`);
    }
  }

  async create(book: CreateDto): Promise<Book | Error | null | boolean> {
    try {
      const result = this.bookModel.create(book);

      if (!result) {
        return null;
      }

      return result;
    } catch (e) {
      throw new Error(`Failed to create book ${e?.message}`);
    }
  }

  async updateBookById(id: string, book: updateDto): Promise<Book | null> {
    try {
      const result = await this.bookModel.findByIdAndUpdate({ _id: id }, book, {
        new: true,
        runValidators: true,
      });

      if (!result) {
        return null;
      }

      return result;
    } catch (e) {
      throw new Error(`something went wrong ${e?.message}`);
    }
  }

  async deleteBookById(id: string): Promise<true | null> {
    try {
      const result = await this.bookModel.findByIdAndDelete(id);

      if (!result) {
        return null;
      }
      return true;
    } catch (e) {
      throw new Error(`somthing went wrong ${e.message}`);
    }
  }
}
