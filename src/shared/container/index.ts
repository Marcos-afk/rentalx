import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/accounts/implementations/UsersRepository';
import { UsersRepositoryProps } from '../../modules/accounts/repositories/UsersRepositoryProps';
import { CategoriesRepository } from '../../modules/cars/implementations/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/implementations/SpecificationRepository';
import { CategoriesRepositoryProps } from '../../modules/cars/repositories/CategoriesRepositoryProps';
import { SpecificationRepositoryProps } from '../../modules/cars/repositories/SpecificationRepositoryProps';

container.registerSingleton<CategoriesRepositoryProps>('CategoriesRepository', CategoriesRepository);
container.registerSingleton<SpecificationRepositoryProps>('SpecificationRepository', SpecificationRepository);
container.registerSingleton<UsersRepositoryProps>('UsersRepository', UsersRepository);
