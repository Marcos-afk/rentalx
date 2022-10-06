import { Request, Response } from 'express';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';
import { container } from 'tsyringe';

export class ListSpecificationsController {
  public handle(req: Request, res: Response) {
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);

    const specifications = listSpecificationsUseCase.execute();
    return res.status(200).json(specifications);
  }
}
