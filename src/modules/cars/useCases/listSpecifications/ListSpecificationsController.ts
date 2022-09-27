import { Request, Response } from 'express';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

export class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

  public handle(req: Request, res: Response) {
    const specifications = this.listSpecificationsUseCase.execute();
    return res.status(200).json(specifications);
  }
}
