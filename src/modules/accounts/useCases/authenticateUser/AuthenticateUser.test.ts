import { UsersRepositoryInMemory } from '../../in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { config } from 'dotenv';
import { AppError } from '../../../../errors/AppError';
config();

let authenticateUserCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
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
