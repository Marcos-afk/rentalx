import { Category } from '../infra/typeorm/entities/Category';

export interface CreateCategoryDtoProps {
  name: string;
  description: string;
}

export interface CategoriesRepositoryProps {
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category | null>;
  create({ name, description }: CreateCategoryDtoProps): Promise<Category>;
}
