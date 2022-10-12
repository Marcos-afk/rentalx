import { Specification } from '../infra/typeorm/entities/Specifications';

export interface CreateSpecificationDto {
  name: string;
  description: string;
}

export interface SpecificationRepositoryProps {
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification | null>;
  create({ name, description }: CreateSpecificationDto): Promise<Specification>;
}
