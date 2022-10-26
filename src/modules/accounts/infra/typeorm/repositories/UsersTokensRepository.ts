import { Repository } from 'typeorm';
import { AppSource } from '../../../../../shared/infra/typeorm';
import { CreateUserTokenDtoProps } from '../../../dtos/CreateUserTokenDtoProps';
import { UsersTokensRepositoryProps } from '../../../repositories/UsersTokensRepositoryProps';
import { UserTokens } from '../entities/UserTokens';

export class UsersTokensRepository implements UsersTokensRepositoryProps {
  private users_tokens: Repository<UserTokens>;

  constructor() {
    this.users_tokens = AppSource.getRepository(UserTokens);
  }

  async create(createUserToken: CreateUserTokenDtoProps): Promise<UserTokens> {
    const userToken = this.users_tokens.create(createUserToken);

    await this.users_tokens.save(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null> {
    return await this.users_tokens.findOneBy({ user_id, refresh_token });
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
    return await this.users_tokens.findOneBy({ refresh_token });
  }

  async deleteToken(user_token: UserTokens): Promise<UserTokens> {
    return await this.users_tokens.remove(user_token);
  }
}
