import { Repository } from 'typeorm';
import { AppSource } from '../../../../../shared/infra/typeorm';
import { CarsRepositoryProps, CreateCarDtoProps } from '../../../repositories/CarsRepositoriesProps';
import { Cars } from '../entities/Cars';

export class CarsRepository implements CarsRepositoryProps {
  private cars: Repository<Cars>;
  constructor() {
    this.cars = AppSource.getRepository(Cars);
  }

  async findById(id: string): Promise<Cars | null> {
    return await this.cars.findOneBy({ id });
  }

  async list(category_id?: string, name?: string, brand?: string): Promise<Cars[]> {
    const carsQuery = this.cars.createQueryBuilder('car').where('available = :available', { available: true });

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async create(createCar: CreateCarDtoProps): Promise<Cars> {
    const car = this.cars.create(createCar);
    await this.cars.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Cars | null> {
    return await this.cars.findOneBy({ license_plate });
  }

  async save(car: Cars): Promise<Cars> {
    await this.cars.save(car);
    return car;
  }
}
