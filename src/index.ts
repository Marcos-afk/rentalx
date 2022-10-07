import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { Routes } from './modules/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger.json';
import { InitializeConnection } from './database';
import './shared/container';
import { AppError } from './errors/AppError';

config();

const app = express();
InitializeConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(Routes);

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na url/porta: ${PORT}`);
});
