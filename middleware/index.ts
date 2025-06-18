import express from 'express';
import cors from 'cors';
import path from 'node:path';

const applyGlobalMiddleware = (app: express.Express) => {
  // app.use(cors(true));
  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public')));
};

export default applyGlobalMiddleware;
