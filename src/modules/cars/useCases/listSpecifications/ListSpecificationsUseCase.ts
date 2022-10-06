import { injectable, inject } from 'tsyringe';
import { SpecificationRepositoryProps } from '../../repositories/SpecificationRepositoryProps';

@injectable()
export class ListSpecificationsUseCase {
  constructor(@inject('SpecificationRepository') private specificationRepository: SpecificationRepositoryProps) {}

  public execute() {
    const specifications = this.specificationRepository.list();
    return specifications;
  }
}
