import { Repository } from 'typeorm';
import { AppSource } from '../../../database';
import { Category } from '../entities/Category';
import { CategoriesRepositoryProps, CreateCategoryDtoProps } from '../repositories/CategoriesRepositoryProps';

export class CategoriesRepository implements CategoriesRepositoryProps {
  private categories: Repository<Category>;

  constructor() {
    this.categories = AppSource.getRepository(Category);
  }

  public async list(): Promise<Category[]> {
    return await this.categories.find();
  }

  public async findByName(name: string): Promise<Category | null> {
    return await this.categories.findOneBy({ name });
  }

  async create({ name, description }: CreateCategoryDtoProps): Promise<Category> {
    const category = this.categories.create({ name, description });
    await this.categories.save(category);
    return category;
  }
}
