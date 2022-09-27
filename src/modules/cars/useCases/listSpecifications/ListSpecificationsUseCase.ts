import { SpecificationRepositoryProps } from '../../repositories/SpecificationRepositoryProps';

export class ListSpecificationsUseCase {
  constructor(private specificationsRepository: SpecificationRepositoryProps) {}

  public execute() {
    const specifications = this.specificationsRepository.list();
    return specifications;
  }
}
