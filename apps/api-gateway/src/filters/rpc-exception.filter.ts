import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

interface ICustomRpcErrorInterface {
  error: IError;
}

interface IError {
  status: number;
  description: string;
  error: string;
}
@Catch(RpcException)
export class CustomRpcExceptionFilter implements ExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (typeof error === 'object') {
      const { error: err } = error as ICustomRpcErrorInterface;
      return response.status(err.status).json({
        message: err.description,
        error: err.error,
      });
    }

    if (typeof error === 'string') {
      return response.status(500).json({
        message: 'Ocurrió un error inesperado',
        error: 'Internal Server Error',
      });
    }
  }
}
