import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { dataSource } from '../enums/dataSource.enum';
import { HttpError } from '../helpers/httpsError.helpers';

export const validateRequest = (
  schema: z.ZodObject<any>,
  source: dataSource = dataSource.BODY,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let data: any;
      if (source === dataSource.BODY) data = req.body;
      if (source === dataSource.PARAMS) data = req.params;
      if (source === dataSource.QUERY) data = req.query;
      schema.parse(data);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Collect all validation error messages
        const errorMessages = err.errors.map(
          (e: z.ZodIssue) => e.message || 'Validation error',
        );
        // Stringify the error messages for HttpError message parameter
        const errorMessageString = JSON.stringify(errorMessages);
        // Throw a new HttpError with the stringified messages
        throw new HttpError(
          errorMessageString,
          400,
          'VALIDATION_ERROR',
        );
      }
    }
  };
};
