import { Rental } from '../infra/typeorm/entities/Rental';
import { CreateRentalDtoProps, RentalsRepositoryProps } from '../repositories/RentalsRepositoryProps';

export class RentalsRepositoryInMemory implements RentalsRepositoryProps {
  private rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    const car = this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    if (!car) {
      return null;
    }

    return car;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    const user = this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<Rental | null> {
    const rental = this.rentals.find(rental => rental.id === id);
    if (!rental) {
      return null;
    }

    return rental;
  }

  async create({ user_id, car_id, expected_return_date }: CreateRentalDtoProps): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);
    return rental;
  }

  async update(rental: Rental): Promise<Rental> {
    const index = this.rentals.findIndex(r => r.id === rental.id);
    this.rentals[index] = rental;
    return rental;
  }
}
