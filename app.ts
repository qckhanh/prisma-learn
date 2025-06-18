import * as http from 'node:http';
import express, { Express } from 'express';
import applyRoutes from './routes';
import applyGlobalMiddleware from './middleware';
import { PrismaClient } from '@prisma/client';
import { MyPrisma } from './prisma';

const PORT = 5001;
const app: Express = express();
/**
 * DO NOT TOUCH THIS FILE
 */
const server = http.createServer(app);
MyPrisma.getInstance();

applyGlobalMiddleware(app);

//REST API
applyRoutes(app);

server.listen(PORT, async (): Promise<void> => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
