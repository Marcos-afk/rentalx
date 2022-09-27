import { Specification } from '../model/Specifications';

export interface CreateSpecificationDto {
  name: string;
  description: string;
}

export interface SpecificationRepositoryProps {
  list(): Specification[];
  findByName(name: string): Specification | undefined;
  create({ name, description }: CreateSpecificationDto): Specification;
}
