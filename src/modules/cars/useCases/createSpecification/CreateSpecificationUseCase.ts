import { injectable, inject } from 'tsyringe';
import { SpecificationRepositoryProps } from '../../repositories/SpecificationRepositoryProps';

interface RequestProps {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(@inject('SpecificationRepository') private specificationRepository: SpecificationRepositoryProps) {}

  public execute({ name, description }: RequestProps) {
    const isExistingSpecification = this.specificationRepository.findByName(name);
    if (isExistingSpecification) {
      throw new Error('Nome de especificação já está sendo utilizado');
    }

    const specification = this.specificationRepository.create({ name, description });
    return specification;
  }
}
