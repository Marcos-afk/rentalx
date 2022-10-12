import { CreateUserDtoProps } from '../dtos/CreateUserDtoProps';
import { User } from '../infra/typeorm/entities/User';

export interface UsersRepositoryProps {
  create(createUserDto: CreateUserDtoProps): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
