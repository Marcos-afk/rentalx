import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name',
      daily_rate: 48,
      license_plate: 'License_plate',
      fine_amount: 24,
      category_id: 'teste',
      description: 'teste',
      brand: 'Brand',
    });

    expect(car).toHaveProperty('id');
  });

  it('Car not created. The car license plate already exists in the system', async () => {
    await createCarUseCase.execute({
      name: 'Name',
      daily_rate: 48,
      license_plate: 'License_plate',
      fine_amount: 24,
      category_id: 'teste',
      description: 'teste',
      brand: 'Brand',
    });

    expect(
      createCarUseCase.execute({
        name: 'Name',
        daily_rate: 48,
        license_plate: 'License_plate',
        fine_amount: 24,
        category_id: 'teste',
        description: 'teste',
        brand: 'Brand',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name',
      daily_rate: 48,
      license_plate: 'License_plate',
      fine_amount: 24,
      category_id: 'teste',
      description: 'teste',
      brand: 'Brand',
    });

    expect(car.available).toBe(true);
  });
});
