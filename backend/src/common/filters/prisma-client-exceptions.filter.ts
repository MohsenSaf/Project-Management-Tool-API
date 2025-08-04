import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter
  implements ExceptionFilter<Prisma.PrismaClientKnownRequestError>
{
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message = 'Database error';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'P2002': // Unique constraint failed
        message = `Unique constraint failed on field: ${exception.meta?.target}`;
        statusCode = HttpStatus.CONFLICT;
        break;
      case 'P2025': // Record not found
        message = `Record not found`;
        statusCode = HttpStatus.NOT_FOUND;
        break;
      case 'P2003': // Foreign key constraint failed
        message = `Foreign key constraint failed`;
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      default:
        message = `Prisma error: ${exception.message}`;
        break;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: 'PrismaClientKnownRequestError',
    });
  }
}
