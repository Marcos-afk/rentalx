import { inject, injectable } from 'tsyringe';
import { CarsImagesRepositoryProps } from '../../repositories/CarsImagesRepositoryProps';

interface RequestProps {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImageUseCase {
  constructor(@inject('CarsImagesRepository') private carsImagesRepository: CarsImagesRepositoryProps) {}

  public async execute({ car_id, images_name }: RequestProps) {
    images_name.map(async image_name => await this.carsImagesRepository.create(car_id, image_name));
  }
}
