import express from 'express';
import cors from 'cors';
import path from 'node:path';

const applyGlobalMiddleware = (app: express.Express) => {
  // app.use(cors(true));
  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public')));
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
};

export default applyGlobalMiddleware;
