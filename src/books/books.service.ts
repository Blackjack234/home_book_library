import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/books.schema';
import mongoose from 'mongoose';
import { CreateDto } from './dto/createBook.dto';
import { updateDto } from './dto/updateBook.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: mongoose.Model<Book>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
      const value = await this.cacheManager.get<Book>(id);

      if (value) {
        return value;
      }

      const result = await this.bookModel.findById({ _id: id });

      if (!result) {
        return null;
      }
      await this.cacheManager.set(id, result, 100000);
      return result;
    } catch (e) {
      throw new Error(`somthing went wrong ${e.message}`);
    }
  }

  async create(book: CreateDto): Promise<Book | Error | null | boolean> {
    try {
      const result: Book = await this.bookModel.create(book);

      if (!result) {
        return null;
      }

      const id = JSON.stringify(result._id);

      await this.cacheManager.set(id, result, 100000);
      // console.log(await this.cacheManager.get(id));

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
