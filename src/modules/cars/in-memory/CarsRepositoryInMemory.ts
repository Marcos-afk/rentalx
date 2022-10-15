import { Cars } from '../infra/typeorm/entities/Cars';
import { CarsRepositoryProps, CreateCarDtoProps } from '../repositories/CarsRepositoriesProps';

export class CarsRepositoryInMemory implements CarsRepositoryProps {
  private cars: Cars[] = [];

  async list(category_id?: string, name?: string, brand?: string): Promise<Cars[]> {
    const cars = this.cars.filter(car => {
      if (
        car.available === true ||
        (category_id && car.category_id === category_id) ||
        (brand && car.brand === brand) ||
        (name && car.name === name)
      ) {
        return car;
      }
    });

    return cars;
  }

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

  async findById(id: string): Promise<Cars | null> {
    const car = this.cars.find(car => car.id === id);
    if (!car) {
      return null;
    }

    return car;
  }

  async save(car: Cars): Promise<Cars> {
    const index = this.cars.findIndex(c => c.id === car.id);
    this.cars[index] = car;
    return car;
  }
}
