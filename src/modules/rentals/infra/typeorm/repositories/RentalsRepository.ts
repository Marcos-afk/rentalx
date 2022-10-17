import { Repository } from 'typeorm';
import { AppSource } from '../../../../../shared/infra/typeorm';
import { CreateRentalDtoProps, RentalsRepositoryProps } from '../../../repositories/RentalsRepositoryProps';
import { Rental } from '../entities/Rental';

export class RentalsRepository implements RentalsRepositoryProps {
  private rentals: Repository<Rental>;

  constructor() {
    this.rentals = AppSource.getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    return await this.rentals.findOneBy({ car_id });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    return await this.rentals.findOneBy({ user_id });
  }

  async create({ user_id, car_id, expected_return_date }: CreateRentalDtoProps): Promise<Rental> {
    const rental = this.rentals.create({ user_id, car_id, expected_return_date });
    await this.rentals.save(rental);
    return rental;
  }
}
