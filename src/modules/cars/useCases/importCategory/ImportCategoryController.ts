import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { container } from 'tsyringe';

export class ImportCategoryController {
  public handle(req: Request, res: Response) {
    const { file } = req;

    if (!file) {
      throw new Error('Arquivo não encontrado');
    }

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    importCategoryUseCase.execute(file);
    return res.status(201).json({ message: 'Categorias importadas com sucesso!' });
  }
}
