import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { DateProviderProps } from '../../../../shared/providers/DateProvider/DateProviderProps';
import { CarsRepositoryProps } from '../../../cars/repositories/CarsRepositoriesProps';
import { RentalsRepositoryProps } from '../../repositories/RentalsRepositoryProps';

interface RequestProps {
  id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: RentalsRepositoryProps,
    @inject('DateProvider') private dateProvider: DateProviderProps,
    @inject('CarsRepository') private carsRepository: CarsRepositoryProps,
  ) {}

  public async execute({ id }: RequestProps) {
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) {
      throw new AppError('Aluguel não foi encontrado');
    }

    if (rental.end_date) {
      throw new AppError('Aluguel já foi finalizado');
    }

    const car = await this.carsRepository.findById(rental.car_id);
    if (!car) {
      throw new AppError('Carro não foi encontrado');
    }

    let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());
    if (daily <= 0) {
      daily = 1;
    }

    const delay = this.dateProvider.compareInDays(rental.expected_return_date, this.dateProvider.dateNow());
    let total = 0;
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.total = total;
    rental.end_date = this.dateProvider.dateNow();
    const rentalUpdated = await this.rentalsRepository.update(rental);
    const updatedAvailableCar = await this.carsRepository.findById(rental.car_id);

    if (updatedAvailableCar) {
      updatedAvailableCar.available = true;
      await this.carsRepository.save(updatedAvailableCar);
    }

    return rentalUpdated;
  }
}
