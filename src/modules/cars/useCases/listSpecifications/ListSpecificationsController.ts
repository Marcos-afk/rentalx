import { Request, Response } from 'express';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';
import { container } from 'tsyringe';

export class ListSpecificationsController {
  public async handle(req: Request, res: Response) {
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);

    const specifications = await listSpecificationsUseCase.execute();
    return res.status(200).json(specifications);
  }
}
