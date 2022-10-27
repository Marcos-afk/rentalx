import { hash } from 'bcryptjs';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { app } from '../../../../shared/infra/http/app';
import { AppSource, InitializeConnection } from '../../../../shared/infra/typeorm';

describe('Create category controller', () => {
  beforeAll(async () => {
    await InitializeConnection();
    await AppSource.runMigrations();
    const id = uuidV4();
    const password = await hash('admin', 8);

    AppSource.query(`INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXX-XXX')`);
  });

  afterAll(async () => {
    await AppSource.dropDatabase();
    await AppSource.destroy();
  });

  it('should be able to list all a categories', async () => {
    const responseToken = await request(app).post('/authenticate-user').send({
      email: 'admin@rentalx.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .get('/categories')
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(200);
  });
});
