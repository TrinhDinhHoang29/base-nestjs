import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception);
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';
    const error =
      exception instanceof HttpException
        ? { ...(exception.cause as object) }
        : {};

    const exceptionResponse = exception.getResponse() as {
      error: string;
    };
    response.status(status).json({
      statusCode: exceptionResponse.error ? exceptionResponse.error : status,
      message,
      error,
    });
  }
}
