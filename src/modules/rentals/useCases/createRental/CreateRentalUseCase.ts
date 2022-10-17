import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { DateProviderProps } from '../../../../shared/providers/DateProvider/DateProviderProps';
import { RentalsRepositoryProps } from '../../repositories/RentalsRepositoryProps';

interface RequestProps {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: RentalsRepositoryProps,
    @inject('DateProvider') private dateProvider: DateProviderProps,
  ) {}

  public async execute({ user_id, car_id, expected_return_date }: RequestProps) {
    const car = await this.rentalsRepository.findOpenRentalByCar(car_id);
    if (car) {
      throw new AppError('Carro indisponível');
    }

    const user = await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (user) {
      throw new AppError('Usuário já possui um aluguel ativo');
    }

    const expectedReturnDateFormat = this.dateProvider.convertToUtc(expected_return_date);
    const dateNow = this.dateProvider.convertToUtc(new Date());
    const compareDate = this.dateProvider.compareInHours(dateNow, expectedReturnDateFormat);

    if (compareDate < 24) {
      throw new AppError('O aluguel deve ter duração mínima de 24 horas');
    }

    const rental = await this.rentalsRepository.create({ user_id, car_id, expected_return_date });
    return rental;
  }
}
