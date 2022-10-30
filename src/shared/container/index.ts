import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { UsersRepositoryProps } from '../../modules/accounts/repositories/UsersRepositoryProps';
import { UsersTokensRepositoryProps } from '../../modules/accounts/repositories/UsersTokensRepositoryProps';
import { CarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImagesRepositoryProps';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { CarsImagesRepositoryProps } from '../../modules/cars/repositories/CarsImagesRepositoryProps';
import { CarsRepositoryProps } from '../../modules/cars/repositories/CarsRepositoriesProps';
import { CategoriesRepositoryProps } from '../../modules/cars/repositories/CategoriesRepositoryProps';
import { SpecificationRepositoryProps } from '../../modules/cars/repositories/SpecificationRepositoryProps';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { RentalsRepositoryProps } from '../../modules/rentals/repositories/RentalsRepositoryProps';
import { DateProviderProps } from '../providers/DateProvider/DateProviderProps';
import { DayJsDateProvider } from '../providers/DateProvider/implementations/DayJsDateProvider';
import { EtherealMailProvider } from '../providers/MailProvider/implementations/EtherealMailProvider';
import { SESMailProvider } from '../providers/MailProvider/implementations/SESMailProvider';
import { MailProviderProps } from '../providers/MailProvider/MailProviderProps';
import { LocalStorageProvider } from '../providers/StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from '../providers/StorageProvider/implementations/S3StorageProvider';
import { StorageProviderProps } from '../providers/StorageProvider/StorageProviderProps';

container.registerSingleton<CategoriesRepositoryProps>('CategoriesRepository', CategoriesRepository);
container.registerSingleton<SpecificationRepositoryProps>('SpecificationRepository', SpecificationRepository);
container.registerSingleton<UsersRepositoryProps>('UsersRepository', UsersRepository);
container.registerSingleton<CarsRepositoryProps>('CarsRepository', CarsRepository);
container.registerSingleton<CarsImagesRepositoryProps>('CarsImagesRepository', CarsImagesRepository);
container.registerSingleton<DateProviderProps>('DateProvider', DayJsDateProvider);
container.registerSingleton<RentalsRepositoryProps>('RentalsRepository', RentalsRepository);
container.registerSingleton<UsersTokensRepositoryProps>('UsersTokensRepository', UsersTokensRepository);

container.registerInstance<MailProviderProps>(
  'MailProvider',
  process.env.MAIL_PROVIDER === 'SES' ? new SESMailProvider() : new EtherealMailProvider(),
);

container.registerSingleton<StorageProviderProps>(
  'StorageProvider',
  process.env.STORAGE_DRIVER === 's3' ? S3StorageProvider : LocalStorageProvider,
);
