import { CarsRepositoryInMemory } from '../../in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all cars available in cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1',
      daily_rate: 140.0,
      license_plate: 'DEF-1313',
      fine_amount: 120,
      brand: 'Audi',
      category_id: '55e99282-3bc0-4bcf-9094-7da6cde6b7f3',
      description: 'Carro com espaço',
    });

    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1_teste',
      daily_rate: 140.0,
      license_plate: 'DEF-1313',
      fine_amount: 120,
      brand: 'Audi',
      category_id: '55e99282-3bc0-4bcf-9094-7da6cde6b7f3',
      description: 'Carro com espaço',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Audi A1_teste',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1_teste',
      daily_rate: 140.0,
      license_plate: 'DEF-1313',
      fine_amount: 120,
      brand: 'Audi',
      category_id: '55e99282-3bc0-4bcf-9094-7da6cde6b7f3',
      description: 'Carro com espaço',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Audi',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1_teste',
      daily_rate: 140.0,
      license_plate: 'DEF-1313',
      fine_amount: 120,
      brand: 'Audi',
      category_id: '55e99282-3bc0-4bcf-9094-7da6cde6b7f3',
      description: 'Carro com espaço',
    });

    const cars = await listCarsUseCase.execute({
      category_id: '55e99282-3bc0-4bcf-9094-7da6cde6b7f3',
    });

    expect(cars).toEqual([car]);
  });
});
