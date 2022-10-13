//import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryProps } from '../../repositories/CarsRepositoriesProps';

interface RequestProps {
  name: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  description: string;
}

//@injectable()
export class CreateCarUseCase {
  constructor(
    /*@inject('CarsRepository') private CategoriesRepository: CarsRepositoryProps*/ private CategoriesRepository: CarsRepositoryProps,
  ) {}

  public async execute({
    name,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    description,
  }: RequestProps) {
    const isExistingLicensePlate = await this.CategoriesRepository.findByLicensePlate(license_plate);
    if (isExistingLicensePlate) {
      throw new AppError('Placa de carro inválida');
    }

    const car = await this.CategoriesRepository.create({
      name,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      description,
    });

    return car;
  }
}
