import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryProps } from '../../repositories/CarsRepositoriesProps';
import { SpecificationRepositoryProps } from '../../repositories/SpecificationRepositoryProps';

interface RequestProps {
  car_id: string;
  specification_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: CarsRepositoryProps,
    @inject('SpecificationRepository') private specificationRepository: SpecificationRepositoryProps,
  ) {}

  public async execute({ car_id, specification_id }: RequestProps) {
    const carIsExisting = await this.carsRepository.findById(car_id);
    if (!carIsExisting) {
      throw new AppError('Carro não foi encontrado', 404);
    }

    const allSpecifications = await this.specificationRepository.findByIds(specification_id);
    carIsExisting.specifications = allSpecifications;

    const car = await this.carsRepository.save(carIsExisting);

    return car;
  }
}
