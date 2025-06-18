import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../helpers/httpsError.helpers';

export function errorMiddleware(err: any, req: Request, res: Response, _next: NextFunction): void {

    let error: HttpError =
        err instanceof HttpError
            ? err
            : new HttpError(err.message || 'Internal Server Error', 500, 'UNKNOWN_ERROR');

    const statusCode = error.statusCode || 500;
    const response: Record<string, any> = {
        success: false,
        message: error.message || 'Internal Server Error',
        code: error.code || 'UNKNOWN_ERROR',
    };


    // Send response
    res.status(statusCode).json(response);
}

export default errorMiddleware;
