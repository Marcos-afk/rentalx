import { Repository } from 'typeorm';
import { AppSource } from '../../../database';
import { CreateUserDtoProps } from '../dtos/CreateUserDtoProps';
import { User } from '../entities/User';
import { UsersRepositoryProps } from '../repositories/UsersRepositoryProps';

export class UsersRepository implements UsersRepositoryProps {
  private users: Repository<User>;

  constructor() {
    this.users = AppSource.getRepository(User);
  }

  public async create({ name, username, email, password, driver_license }: CreateUserDtoProps): Promise<User> {
    const user = this.users.create({ name, username, email, password, driver_license });
    await this.users.save(user);
    return user;
  }

  public async findByUsername(username: string): Promise<User | null> {
    return await this.users.findOneBy({ username });
  }
}
