import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';

export class ImportCategoryController {
  public async handle(req: Request, res: Response) {
    const { file } = req;

    if (!file) {
      throw new AppError('Arquivo não encontrado', 404);
    }

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);
    return res.status(201).json({ message: 'Categorias importadas com sucesso!' });
  }
}
