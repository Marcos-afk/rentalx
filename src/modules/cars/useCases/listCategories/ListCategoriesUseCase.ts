import { CategoriesRepositoryProps } from '../../repositories/CategoriesRepositoryProps';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryProps) {}

  public async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
