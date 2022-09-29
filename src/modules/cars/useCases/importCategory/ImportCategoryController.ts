import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}
  public handle(req: Request, res: Response) {
    const { file } = req;

    if (!file) {
      throw new Error('Arquivo não encontrado');
    }

    this.importCategoryUseCase.execute(file);
    return res.status(201).json({ message: 'Categorias importadas com sucesso!' });
  }
}
