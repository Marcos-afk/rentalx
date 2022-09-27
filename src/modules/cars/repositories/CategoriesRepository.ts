import { Category } from '../model/Category';
import { CategoriesRepositoryProps, CreateCategoryDtoProps } from './CategoriesRepositoryProps';

export class CategoriesRepository implements CategoriesRepositoryProps {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public list(): Category[] {
    return this.categories;
  }

  public findByName(name: string): Category | undefined {
    return this.categories.find(category => category.name === name);
  }

  create({ name, description }: CreateCategoryDtoProps): Category {
    const category = new Category();
    Object.assign(category, { name, description, created_at: new Date() });
    this.categories.push(category);
    return category;
  }
}
