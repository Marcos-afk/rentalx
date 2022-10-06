import { injectable, inject } from 'tsyringe';
import { SpecificationRepositoryProps } from '../../repositories/SpecificationRepositoryProps';

@injectable()
export class ListSpecificationsUseCase {
  constructor(@inject('SpecificationRepository') private specificationRepository: SpecificationRepositoryProps) {}

  public async execute() {
    const specifications = await this.specificationRepository.list();
    return specifications;
  }
}
