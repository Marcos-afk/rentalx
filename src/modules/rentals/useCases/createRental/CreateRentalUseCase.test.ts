import { AppError } from '../../../../shared/errors/AppError';
import { RentalsRepositoryInMemory } from '../../in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import dayjs from 'dayjs';
import { DayJsDateProvider } from '../../../../shared/providers/DateProvider/implementations/DayJsDateProvider';

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DayJsDateProvider;

describe('Create rental', () => {
  const dayAdd24Yours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dateProvider);
  });

  it('should be able to create a new rental', async () => {
    const rental = {
      user_id: 'userId',
      car_id: 'carId',
      expected_return_date: dayAdd24Yours,
    };

    const rentalCreated = await createRentalUseCase.execute({ ...rental });
    expect(rentalCreated).toHaveProperty('id');
    expect(rentalCreated).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const rental = {
      user_id: 'userId',
      car_id: 'carId',
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
    const rental = {
      user_id: 'userId',
      car_id: 'carId',
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
    const rental = {
      user_id: 'userId',
      car_id: 'carId',
      expected_return_date: new Date(),
    };
    expect(createRentalUseCase.execute({ ...rental })).rejects.toBeInstanceOf(AppError);
  });
});
