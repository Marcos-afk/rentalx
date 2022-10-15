import { Cars } from '../infra/typeorm/entities/Cars';

export interface CreateCarDtoProps {
  name: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  description: string;
}

export interface CarsRepositoryProps {
  create(createCar: CreateCarDtoProps): Promise<Cars>;
  findByLicensePlate(license_plate: string): Promise<Cars | null>;
  list(category_id?: string, name?: string, brand?: string): Promise<Cars[]>;
  findById(id: string): Promise<Cars | null>;
  save(car: Cars): Promise<Cars>;
}
