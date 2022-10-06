import { injectable, inject } from 'tsyringe';
import { CategoriesRepositoryProps } from '../../repositories/CategoriesRepositoryProps';

@injectable()
export class ListCategoriesUseCase {
  constructor(@inject('CategoriesRepository') private categoriesRepository: CategoriesRepositoryProps) {}

  public async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
