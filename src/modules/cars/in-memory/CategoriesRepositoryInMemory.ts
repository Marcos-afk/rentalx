import { Category } from '../entities/Category';
import { CategoriesRepositoryProps, CreateCategoryDtoProps } from '../repositories/CategoriesRepositoryProps';

export class CategoriesRepositoryInMemory implements CategoriesRepositoryProps {
  private categories: Category[] = [];

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find(category => category.name === name);
    if (!category) {
      return null;
    }
    return category;
  }

  async create({ name, description }: CreateCategoryDtoProps): Promise<Category> {
    const category = new Category();
    Object.assign(category, { name, description });
    this.categories.push(category);
    return category;
  }
}
