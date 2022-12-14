import 'reflect-metadata';
import 'express-async-errors';
import '../../container';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { Routes } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../../swagger.json';
import { InitializeConnection } from '../typeorm';
import { AppError } from '../../errors/AppError';
import { uploadConfig } from '../../../config/upload';
import { rateLimiter } from './middlewares/rateLimiter';

config();

const app = express();
InitializeConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(Routes);

app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`));
app.use('/cars', express.static(`${uploadConfig.tmpFolder}/cars`));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
});

export { app };
