import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface FilesProps {
  filename: string;
}

export class UploadCarImageController {
  public async handle(req: Request, res: Response) {
    const { car_id } = req.params;
    const images = req.files as FilesProps[];
    const images_name = images?.map(file => file.filename);
    const uploadCarImages = container.resolve(UploadCarImageUseCase);

    await uploadCarImages.execute({ images_name, car_id });

    return res.status(201).json({ message: 'Upload realizado com sucesso!' });
  }
}
