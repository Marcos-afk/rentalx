import { SpecificationRepositoryProps } from '../../repositories/SpecificationRepositoryProps';

interface RequestProps {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationRepository: SpecificationRepositoryProps) {}

  public execute({ name, description }: RequestProps) {
    const isExistingSpecification = this.specificationRepository.findByName(name);
    if (isExistingSpecification) {
      throw new Error('Nome de especificação já está sendo utilizado');
    }

    const specification = this.specificationRepository.create({ name, description });
    return specification;
  }
}
