import { Category } from '../model/Category';

interface CreateCategoryDtoProps {
  name: string;
  description: string;
}

export class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public list() {
    return this.categories;
  }

  public findByName(name: string) {
    return this.categories.find(category => category.name === name);
  }

  public create({ name, description }: CreateCategoryDtoProps) {
    const category = new Category();
    Object.assign(category, { name, description, created_at: new Date() });
    this.categories.push(category);
    return category;
  }
}
