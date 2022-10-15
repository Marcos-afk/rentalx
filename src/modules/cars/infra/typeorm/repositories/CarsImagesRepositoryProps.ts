import { Repository } from 'typeorm';
import { AppSource } from '../../../../../shared/infra/typeorm';
import { CarsImagesRepositoryProps } from '../../../repositories/CarsImagesRepositoryProps';
import { CarImage } from '../entities/CarImage';

export class CarsImagesRepository implements CarsImagesRepositoryProps {
  private carsImages: Repository<CarImage>;

  constructor() {
    this.carsImages = AppSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.carsImages.create({ car_id, image_name });

    await this.carsImages.save(carImage);
    return carImage;
  }
}
