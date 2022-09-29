import fs from 'fs';
import { parse as csvParse } from 'csv-parse';
import { CategoriesRepositoryProps } from '../../repositories/CategoriesRepositoryProps';

interface ImportCategoriesProps {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryProps) {}

  public loadCategories(file: Express.Multer.File): Promise<ImportCategoriesProps[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();
      const categories: ImportCategoriesProps[] = [];

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  public async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const { name, description } = category;

      const isExistingName = this.categoriesRepository.findByName(name);
      if (!isExistingName) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}
