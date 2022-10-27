import { UsersRepositoryInMemory } from '../../in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { AppError } from '../../../../shared/errors/AppError';
import { DateProviderProps } from '../../../../shared/providers/DateProvider/DateProviderProps';
import { DayJsDateProvider } from '../../../../shared/providers/DateProvider/implementations/DayJsDateProvider';
import { UsersTokensRepositoryProps } from '../../repositories/UsersTokensRepositoryProps';
import { UsersTokensRepositoryInMemory } from '../../in-memory/UsersTokensRepositoryInMemory';

let authenticateUserCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DateProviderProps;
let usersTokensRepositoryInMemory: UsersTokensRepositoryProps;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    authenticateUserCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user = {
      name: 'User name',
      email: 'User email',
      password: 'UserPassword',
      driver_license: '0002ABC',
    };

    await createUserUseCase.execute({
      name: user.name,
      password: user.password,
      email: user.email,
      driver_license: user.driver_license,
    });

    const response = await authenticateUserCase.execute({ email: user.email, password: user.password });
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('refresh_token');
  });

  it('Authenticated failed. User does not exist', async () => {
    expect(authenticateUserCase.execute({ email: 'teste', password: 'teste' })).rejects.toBeInstanceOf(AppError);
  });

  it('Authenticated failed. User password incorrect', async () => {
    const user = {
      name: 'User name',
      email: 'User email',
      password: 'UserPassword',
      driver_license: '0002ABC',
    };

    await createUserUseCase.execute({
      name: user.name,
      password: user.password,
      email: user.email,
      driver_license: user.driver_license,
    });

    expect(authenticateUserCase.execute({ email: user.email, password: 'invalid' })).rejects.toBeInstanceOf(AppError);
  });
});
