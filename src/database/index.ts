import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export const AppSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [],
  migrations: [],
});

export const InitializeConnection = async () => {
  try {
    AppSource.initialize();
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  }
};
