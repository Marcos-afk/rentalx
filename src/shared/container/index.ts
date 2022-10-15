import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersRepositoryProps } from '../../modules/accounts/repositories/UsersRepositoryProps';
import { CarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImagesRepositoryProps';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { CarsImagesRepositoryProps } from '../../modules/cars/repositories/CarsImagesRepositoryProps';
import { CarsRepositoryProps } from '../../modules/cars/repositories/CarsRepositoriesProps';
import { CategoriesRepositoryProps } from '../../modules/cars/repositories/CategoriesRepositoryProps';
import { SpecificationRepositoryProps } from '../../modules/cars/repositories/SpecificationRepositoryProps';

container.registerSingleton<CategoriesRepositoryProps>('CategoriesRepository', CategoriesRepository);
container.registerSingleton<SpecificationRepositoryProps>('SpecificationRepository', SpecificationRepository);
container.registerSingleton<UsersRepositoryProps>('UsersRepository', UsersRepository);
container.registerSingleton<CarsRepositoryProps>('CarsRepository', CarsRepository);
container.registerSingleton<CarsImagesRepositoryProps>('CarsImagesRepository', CarsImagesRepository);
