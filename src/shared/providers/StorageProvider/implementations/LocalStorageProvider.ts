import { StorageProviderProps } from '../StorageProviderProps';
import fs from 'fs';
import { resolve } from 'path';
import { uploadConfig } from '../../../../config/upload';

export class LocalStorageProvider implements StorageProviderProps {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(`${uploadConfig.tmpFolder}/${folder}`, file),
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${uploadConfig.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch (error) {
      return;
    }
    await fs.promises.unlink(filename);
  }
}
