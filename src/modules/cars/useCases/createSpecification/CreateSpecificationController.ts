import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';
import { container } from 'tsyringe';

export class CreateSpecificationController {
  public async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

    const specification = await createSpecificationUseCase.execute({ name, description });
    return res.status(201).json(specification);
  }
}
