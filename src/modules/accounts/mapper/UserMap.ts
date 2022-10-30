import { User } from '../infra/typeorm/entities/User';
import { instanceToInstance } from 'class-transformer';

export class UserMap {
  static toDto({ id, name, email, avatar, avatar_url, driver_license }: User) {
    const user = instanceToInstance({
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}
