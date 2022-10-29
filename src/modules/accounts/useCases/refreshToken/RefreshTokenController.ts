import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController {
  public async handle(req: Request, res: Response) {
    const token = req.body.token || req.headers['x-access-token'] || req.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const { refresh_token, newToken } = await refreshTokenUseCase.execute(token);

    return res.status(200).json({ refresh_token, token: newToken });
  }
}
