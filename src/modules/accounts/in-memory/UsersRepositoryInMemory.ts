import { CreateUserDtoProps } from '../dtos/CreateUserDtoProps';
import { User } from '../infra/typeorm/entities/User';
import { UsersRepositoryProps } from '../repositories/UsersRepositoryProps';

export class UsersRepositoryInMemory implements UsersRepositoryProps {
  private users: User[] = [];

  async create({ name, email, password, driver_license }: CreateUserDtoProps): Promise<User> {
    const user = new User();
    Object.assign(user, { name, email, password, driver_license });
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      return null;
    }

    return user;
  }

  async save(user: User): Promise<User> {
    const index = this.users.findIndex(u => u.id === user.id);
    this.users[index] = user;
    return user;
  }
}
