import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../helpers/httpsError.helpers';
import { z } from 'zod';

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.log('Hiiiiiiiiiiiii');
  let error: HttpError;
  let statusCode: number;
  let response: Record<string, any> = {
    success: false,
    code: 'UNKNOWN_ERROR',
  };

  // Handle different types of errors
  if (err instanceof HttpError) {
    error = err;
    statusCode = error.statusCode;
    response.code = error.code || 'UNKNOWN_ERROR';
    response.message = error.message || 'Internal Server Error';
  } else if (err instanceof z.ZodError) {
    // Process Zod validation errors directly
    statusCode = 400;
    response.code = 'VALIDATION_ERROR';
    response.message = err.errors.map((e: z.ZodIssue) => ({
      field: e.path[0] || 'unknown',
      message: e.message || 'Validation error',
    }));
  } else {
    // Unknown error
    statusCode = 500;
    response.message = err.message || 'Internal Server Error';
  }

  // Optional: Add logging for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.error(`Error at ${req.method} ${req.url}:`, err);
  }

  // Send response
  res.status(statusCode).json(response);
}

export default errorMiddleware;
