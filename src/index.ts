import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { Routes } from './modules/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger.json';
import { InitializeConnection } from './database';

config();

const app = express();
InitializeConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(Routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na url/porta: ${PORT}`);
});
