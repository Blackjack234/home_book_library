import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schema/books.schema';
import { CreateDto } from './dto/createBook.dto';
import { updateDto } from './dto/updateBook.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get('all')
  async getAllBook(): Promise<Book[] | Error | null> {
    try {
      return this.bookService.findAllBook();
    } catch (e) {
      throw new Error(`Oops! somthing went wrong ${e?.message}`);
    }
  }

  @Post('create')
  async createBook(@Body() book: CreateDto) {
    try {
      const result = await this.bookService.create(book);
      // return
      if (!result || typeof result !== 'object') {
        throw new InternalServerErrorException(`Opps some thing went wrong.`);
        // return {
        //   message: 'something went wrong in times of book creattion',
        //   data
        // };
      }
      return { message: 'book is created successfully.', data: result };
    } catch (e) {
      throw new InternalServerErrorException(
        `Oops! something went wrong ${e?.message}`,
      );
    }
  }

  @Put('update/:id')
  async updateBooks(
    @Param('id') id: string,
    @Body() book: updateDto,
  ): Promise<{ message: string; data: Book } | null> {
    try {
      const result = await this.bookService.updateBookById(id, book);

      if (!result) {
        throw new Error('Book not found');
      }

      return {
        message: 'Book updated successfully',
        data: result,
      };
    } catch (e) {
      throw new Error(`somthing went wrong ${e.message}`);
    }
  }

  @Get('get/:id')
  async getById(
    @Param('id') id: string,
  ): Promise<{ message: string; data: Book } | Error> {
    try {
      const result = await this.bookService.findBooksById(id);
      if (!result) {
        throw new Error(`Sorry no book found`);
      }

      return { message: 'Bokk is found', data: result };
    } catch (e) {
      throw new Error(`something went wrong ${e?.message}`);
    }
  }

  @Delete('delete/:id')
  async deleteBook(
    @Param('id') id: string,
  ): Promise<{ message: string } | Error> {
    try {
      const result = await this.bookService.deleteBookById(id);

      if (!result) {
        throw new Error('Delete not done');
      }

      return { message: 'Delete is done successfully' };
    } catch (e) {
      throw new Error(`something went wrong ${e.message}`);
    }
  }
}
