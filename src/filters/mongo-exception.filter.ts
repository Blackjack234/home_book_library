import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === 11000) {
      return response.status(409).json({
        statusCode: 409,
        message: 'Duplicate value error: likely email already exists.',
      });
    }

    // fallback
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
