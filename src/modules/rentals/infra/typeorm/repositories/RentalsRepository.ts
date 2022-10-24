import { IsNull, Repository } from 'typeorm';
import { AppSource } from '../../../../../shared/infra/typeorm';
import { CreateRentalDtoProps, RentalsRepositoryProps } from '../../../repositories/RentalsRepositoryProps';
import { Rental } from '../entities/Rental';

export class RentalsRepository implements RentalsRepositoryProps {
  private rentals: Repository<Rental>;

  constructor() {
    this.rentals = AppSource.getRepository(Rental);
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return await this.rentals.find({ where: { user_id }, relations: ['car'] });
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    return await this.rentals.findOneBy({ car_id, end_date: IsNull() });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    return await this.rentals.findOneBy({ user_id, end_date: IsNull() });
  }

  async findById(id: string): Promise<Rental | null> {
    return await this.rentals.findOneBy({ id });
  }

  async create({ user_id, car_id, expected_return_date }: CreateRentalDtoProps): Promise<Rental> {
    const rental = this.rentals.create({ user_id, car_id, expected_return_date });
    await this.rentals.save(rental);
    return rental;
  }

  async update(rental: Rental): Promise<Rental> {
    await this.rentals.save(rental);
    return rental;
  }
}
