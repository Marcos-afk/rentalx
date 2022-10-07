import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { CategoriesRepositoryProps } from '../../repositories/CategoriesRepositoryProps';

interface RequestProps {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(@inject('CategoriesRepository') private categoriesRepository: CategoriesRepositoryProps) {}

  public async execute({ name, description }: RequestProps) {
    const isExistingCategory = await this.categoriesRepository.findByName(name);
    if (isExistingCategory) {
      throw new AppError('Nome de categoria inválido');
    }

    const category = await this.categoriesRepository.create({ name, description });
    return category;
  }
}
