import { CreateUserTokenDtoProps } from '../dtos/CreateUserTokenDtoProps';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';
import { UsersTokensRepositoryProps } from '../repositories/UsersTokensRepositoryProps';

export class UsersTokensRepositoryInMemory implements UsersTokensRepositoryProps {
  private users_tokens: UserTokens[] = [];

  async create({ user_id, expires_date, refresh_token }: CreateUserTokenDtoProps): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { user_id, expires_date, refresh_token });
    this.users_tokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null> {
    const userToken = this.users_tokens.find(
      token => token.user_id === user_id && token.refresh_token === refresh_token,
    );

    if (!userToken) {
      return null;
    }

    return userToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
    const userToken = this.users_tokens.find(token => token.refresh_token === refresh_token);
    if (!userToken) {
      return null;
    }

    return userToken;
  }

  async deleteToken(user_token: UserTokens): Promise<UserTokens> {
    const index = this.users_tokens.findIndex(token => token.id === user_token.id);
    this.users_tokens.splice(index, 1);

    return user_token;
  }
}
