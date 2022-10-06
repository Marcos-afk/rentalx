import { CreateUserDtoProps } from '../dtos/CreateUserDtoProps';
import { User } from '../entities/User';

export interface UsersRepositoryProps {
  create(createUserDto: CreateUserDtoProps): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
}
