import { CarImage } from '../infra/typeorm/entities/CarImage';

export interface CarsImagesRepositoryProps {
  create(car_id: string, image_name: string): Promise<CarImage>;
}
