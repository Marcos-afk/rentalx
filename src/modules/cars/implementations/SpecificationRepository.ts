import { Specification } from '../entities/Specifications';
import { CreateSpecificationDto, SpecificationRepositoryProps } from '../repositories/SpecificationRepositoryProps';

export class SpecificationRepository implements SpecificationRepositoryProps {
  private specifications: Specification[];

  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance() {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE;
  }

  list(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification | undefined {
    return this.specifications.find(specification => specification.name === name);
  }

  create({ name, description }: CreateSpecificationDto): Specification {
    const specification = new Specification();
    Object.assign(specification, { name, description, created_at: new Date() });
    this.specifications.push(specification);
    return specification;
  }
}
