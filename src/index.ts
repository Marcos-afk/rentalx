import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { categoriesRoutes } from './modules/cars/routes/categories.router';
import { specificationsRoutes } from './modules/cars/routes/specifications.router';

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na url/porta: ${PORT}`);
});
