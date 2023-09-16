import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class HttpToRpcExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const originalError = exception?.getResponse()['error'];
    const originalMessage = exception?.getResponse()['message'];

    const objRpcMessage = {
      status,
      description: originalMessage,
      error: originalError,
    };

    return throwError(() => new RpcException(objRpcMessage));
  }
}
