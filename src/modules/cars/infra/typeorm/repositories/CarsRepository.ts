import { Repository } from 'typeorm';
import { AppSource } from '../../../../../shared/infra/typeorm';
import { CarsRepositoryProps, CreateCarDtoProps } from '../../../repositories/CarsRepositoriesProps';
import { Cars } from '../entities/Cars';

export class CarsRepository implements CarsRepositoryProps {
  private cars: Repository<Cars>;
  constructor() {
    this.cars = AppSource.getRepository(Cars);
  }

  async create(createCar: CreateCarDtoProps): Promise<Cars> {
    const car = this.cars.create(createCar);
    await this.cars.save(car);
    return car;
  }

  findByLicensePlate(license_plate: string): Promise<Cars | null> {
    return this.cars.findOneBy({ license_plate });
  }
}
