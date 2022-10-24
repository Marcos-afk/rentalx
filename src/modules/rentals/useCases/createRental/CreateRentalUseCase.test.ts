import { AppError } from '../../../../shared/errors/AppError';
import { RentalsRepositoryInMemory } from '../../in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import dayjs from 'dayjs';
import { DayJsDateProvider } from '../../../../shared/providers/DateProvider/implementations/DayJsDateProvider';
import { CarsRepositoryInMemory } from '../../../cars/in-memory/CarsRepositoryInMemory';

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DayJsDateProvider;

describe('Create rental', () => {
  const dayAdd24Yours = dayjs().add(2, 'day').toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dateProvider, carsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Toyota Land Cruiser',
      daily_rate: 600,
      license_plate: 'xxx-xxy',
      fine_amount: 40,
      brand: 'brand',
      category_id: '9952ce99-8c27-4114-bdba-4b0a03a3cb61',
      description: 'Jipe toyota land cruiser',
    });

    const rental = {
      user_id: 'userId',
      car_id: car.id as string,
      expected_return_date: dayAdd24Yours,
    };

    const rentalCreated = await createRentalUseCase.execute({ ...rental });
    expect(rentalCreated).toHaveProperty('id');
    expect(rentalCreated).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Toyota Land Cruiser',
      daily_rate: 600,
      license_plate: 'xxx-xxy',
      fine_amount: 40,
      brand: 'brand',
      category_id: '9952ce99-8c27-4114-bdba-4b0a03a3cb61',
      description: 'Jipe toyota land cruiser',
    });

    const rental = {
      user_id: 'userId',
      car_id: car.id as string,
      expected_return_date: dayAdd24Yours,
    };

    await createRentalUseCase.execute({ ...rental });

    expect(
      createRentalUseCase.execute({
        user_id: rental.user_id,
        car_id: 'carId2',
        expected_return_date: rental.expected_return_date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Toyota Land Cruiser',
      daily_rate: 600,
      license_plate: 'xxx-xxy',
      fine_amount: 40,
      brand: 'brand',
      category_id: '9952ce99-8c27-4114-bdba-4b0a03a3cb61',
      description: 'Jipe toyota land cruiser',
    });

    const rental = {
      user_id: 'userId',
      car_id: car.id as string,
      expected_return_date: dayAdd24Yours,
    };

    await createRentalUseCase.execute({ ...rental });

    expect(
      createRentalUseCase.execute({
        user_id: 'userId2',
        car_id: rental.car_id,
        expected_return_date: rental.expected_return_date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Toyota Land Cruiser',
      daily_rate: 600,
      license_plate: 'xxx-xxy',
      fine_amount: 40,
      brand: 'brand',
      category_id: '9952ce99-8c27-4114-bdba-4b0a03a3cb61',
      description: 'Jipe toyota land cruiser',
    });

    const rental = {
      user_id: 'userId',
      car_id: car.id as string,
      expected_return_date: new Date(),
    };
    expect(createRentalUseCase.execute({ ...rental })).rejects.toBeInstanceOf(AppError);
  });
});
