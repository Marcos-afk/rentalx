import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export const AppSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
});

export const InitializeConnection = (host = process.env.POSTGRES_HOST) => {
  return AppSource.setOptions({ host }).initialize();
};
