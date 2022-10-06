import { CreateUserDtoProps } from '../dtos/CreateUserDtoProps';
import { User } from '../entities/User';

export interface UsersRepositoryProps {
  create(createUserDto: CreateUserDtoProps): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
