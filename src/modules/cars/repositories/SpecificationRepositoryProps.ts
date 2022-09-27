import { Specification } from '../model/Specifications';

export interface CreateSpecificationDto {
  name: string;
  description: string;
}

export interface SpecificationRepositoryProps {
  create({ name, description }: CreateSpecificationDto): Specification;
  findByName(name: string): Specification | undefined;
}
