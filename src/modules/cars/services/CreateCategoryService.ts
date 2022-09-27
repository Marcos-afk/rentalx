import { CategoriesRepositoryProps } from '../repositories/CategoriesRepositoryProps';

interface RequestProps {
  name: string;
  description: string;
}

export class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepositoryProps) {}

  public execute({ name, description }: RequestProps) {
    const isExistingCategory = this.categoriesRepository.findByName(name);
    if (isExistingCategory) {
      throw new Error('Nome de categoria já está sendo utilizado');
    }

    const category = this.categoriesRepository.create({ name, description });
    return category;
  }
}
