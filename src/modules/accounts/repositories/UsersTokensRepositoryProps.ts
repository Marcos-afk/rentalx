import { CreateUserTokenDtoProps } from '../dtos/CreateUserTokenDtoProps';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

export interface UsersTokensRepositoryProps {
  create(createUserToken: CreateUserTokenDtoProps): Promise<UserTokens>;
  findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserTokens | null>;
  deleteToken(user_token: UserTokens): Promise<UserTokens>;
}
