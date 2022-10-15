import { Repository, In } from 'typeorm';
import { AppSource } from '../../../../../shared/infra/typeorm';
import { Specification } from '../entities/Specifications';
import {
  CreateSpecificationDto,
  SpecificationRepositoryProps,
} from '../../../repositories/SpecificationRepositoryProps';

export class SpecificationRepository implements SpecificationRepositoryProps {
  private specifications: Repository<Specification>;

  constructor() {
    this.specifications = AppSource.getRepository(Specification);
  }

  public async list(): Promise<Specification[]> {
    return await this.specifications.find();
  }

  public async findByName(name: string): Promise<Specification | null> {
    return await this.specifications.findOneBy({ name });
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.specifications.findBy({ id: In(ids) });
  }

  public async create({ name, description }: CreateSpecificationDto): Promise<Specification> {
    const specification = this.specifications.create({ name, description });
    await this.specifications.save(specification);
    return specification;
  }
}
