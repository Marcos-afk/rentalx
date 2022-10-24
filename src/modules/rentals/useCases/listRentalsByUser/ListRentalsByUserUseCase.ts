import { inject, injectable } from 'tsyringe';
import { RentalsRepositoryProps } from '../../repositories/RentalsRepositoryProps';

@injectable()
export class ListRentalsByUserUseCase {
  constructor(@inject('RentalsRepository') private rentalsRepository: RentalsRepositoryProps) {}

  public async execute(user_id: string) {
    return await this.rentalsRepository.findByUserId(user_id);
  }
}
