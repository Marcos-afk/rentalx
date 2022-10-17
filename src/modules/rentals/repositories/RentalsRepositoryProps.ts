import { Rental } from '../infra/typeorm/entities/Rental';

export interface CreateRentalDtoProps {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export interface RentalsRepositoryProps {
  findOpenRentalByCar(car_id: string): Promise<Rental | null>;
  findOpenRentalByUser(user_id: string): Promise<Rental | null>;
  create({ user_id, car_id, expected_return_date }: CreateRentalDtoProps): Promise<Rental>;
}
