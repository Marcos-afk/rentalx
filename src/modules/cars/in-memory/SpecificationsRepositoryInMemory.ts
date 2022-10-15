import { Specification } from '../infra/typeorm/entities/Specifications';
import { CreateSpecificationDto, SpecificationRepositoryProps } from '../repositories/SpecificationRepositoryProps';

export class SpecificationsRepositoryInMemory implements SpecificationRepositoryProps {
  private specifications: Specification[] = [];

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = this.specifications.find(specification => specification.name === name);
    if (!specification) {
      return null;
    }
    return specification;
  }

  async create({ name, description }: CreateSpecificationDto): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter(specification => ids.includes(specification.id as string));
    return allSpecifications;
  }
}
