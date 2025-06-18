import { Express, Response, Request, NextFunction } from 'express';
import errorMiddleware from '../middleware/error.middlewares';
import { HttpError } from '../helpers/httpsError.helpers';
import customerRoute from './customer';
import graphQLRouter from '../graphql/graphRouter';
/**
 * Apply Routes
 *
 * This function registers all API routes with the Express application.
 * Routes are organized by feature domain and follow a consistent API versioning pattern.
 *
 * @param {Express} app - The Express application instance
 */
const applyRoutes = (app: Express) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'http://localhost:5173',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE',
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.use('/api/v1/customers', customerRoute);
  // Add other routes here
  app.use(graphQLRouter);

  //Invalid route
  app.use((req: Request, res: Response, next: NextFunction) => {
    throw new HttpError(
      `Route ${req.method} ${req.originalUrl} does not exist`,
      404,
      'ROUTE_NOT_FOUND',
    );
  });
  // Error handling middleware
  app.use(errorMiddleware);
};

export default applyRoutes;
