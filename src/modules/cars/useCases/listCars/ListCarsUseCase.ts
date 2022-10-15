import { inject, injectable } from 'tsyringe';
import { CarsRepositoryProps } from '../../repositories/CarsRepositoriesProps';

interface RequestProps {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
export class ListCarsUseCase {
  constructor(@inject('CarsRepository') private carsRepository: CarsRepositoryProps) {}
  public async execute({ category_id, name, brand }: RequestProps) {
    return this.carsRepository.list(category_id, name, brand);
  }
}
