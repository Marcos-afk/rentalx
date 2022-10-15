import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '../../in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car specification', () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory,
    );
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    expect(
      createCarSpecificationUseCase.execute({
        car_id: 'teste',
        specification_id: ['teste', 'teste_01'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification', async () => {
    const specification = await specificationRepositoryInMemory.create({
      name: 'teste',
      description: 'teste',
    });

    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1',
      daily_rate: 140.0,
      license_plate: 'DEF-1313',
      fine_amount: 120,
      brand: 'Audi',
      category_id: '55e99282-3bc0-4bcf-9094-7da6cde6b7f3',
      description: 'Carro com espaço',
    });

    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: car.id as string,
      specification_id: [specification.id as string],
    });

    expect(carSpecification).toHaveProperty('specifications');
    expect(carSpecification.specifications.length).toBe(1);
  });
});
