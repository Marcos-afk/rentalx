import { Cars } from '../infra/typeorm/entities/Cars';
import { CarsRepositoryProps, CreateCarDtoProps } from '../repositories/CarsRepositoriesProps';

export class CarsRepositoryInMemory implements CarsRepositoryProps {
  private cars: Cars[] = [];

  async create({
    name,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    description,
  }: CreateCarDtoProps): Promise<Cars> {
    const car = new Cars();
    Object.assign(car, {
      name,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      description,
    });

    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Cars | null> {
    const car = this.cars.find(car => car.license_plate === license_plate);
    if (!car) {
      return null;
    }

    return car;
  }
}
