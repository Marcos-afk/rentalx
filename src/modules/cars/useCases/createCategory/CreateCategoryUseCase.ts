import { CategoriesRepositoryProps } from '../../repositories/CategoriesRepositoryProps';

interface RequestProps {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryProps) {}

  public async execute({ name, description }: RequestProps) {
    const isExistingCategory = await this.categoriesRepository.findByName(name);
    if (isExistingCategory) {
      throw new Error('Nome de categoria já está sendo utilizado');
    }

    const category = await this.categoriesRepository.create({ name, description });
    return category;
  }
}
