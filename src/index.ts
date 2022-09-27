import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { Routes } from './modules/routes';

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na url/porta: ${PORT}`);
});
