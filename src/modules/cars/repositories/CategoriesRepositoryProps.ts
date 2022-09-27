import { Category } from '../model/Category';

export interface CreateCategoryDtoProps {
  name: string;
  description: string;
}

export interface CategoriesRepositoryProps {
  list(): Category[];
  findByName(name: string): Category | undefined;
  create({ name, description }: CreateCategoryDtoProps): Category;
}
