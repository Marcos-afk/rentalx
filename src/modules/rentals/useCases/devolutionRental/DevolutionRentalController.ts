import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

export class DevolutionRentalController {
  public async handle(req: Request, res: Response) {
    const { id } = req.params;

    const devolutionRental = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRental.execute({ id });
    return res.status(200).json(rental);
  }
}
