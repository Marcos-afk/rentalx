import { CategoriesRepositoryProps } from '../../repositories/CategoriesRepositoryProps';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryProps) {}

  public execute() {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}
