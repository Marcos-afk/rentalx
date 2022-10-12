import { AppError } from '../../../../shared/errors/AppError';
import { CategoriesRepositoryInMemory } from '../../in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Category name',
      description: 'Category description',
    });

    expect(category).toHaveProperty('id');
  });

  it('Category not created. The category name already exists in the system', async () => {
    await createCategoryUseCase.execute({
      name: 'Category name',
      description: 'Category description',
    });

    expect(
      createCategoryUseCase.execute({ name: 'Category name', description: 'Category description' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
