import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import { resolve } from 'path';
import fs from 'fs';
import { uploadConfig } from '../../../../config/upload';
import { StorageProviderProps } from '../StorageProviderProps';

export class S3StorageProvider implements StorageProviderProps {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalPath = resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath);
    const ContentType = mime.getType(originalPath);
    if (!ContentType) {
      throw new Error('File not found');
    }

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET as string}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET as string}/${folder}`,
        Key: file,
      })
      .promise();
  }
}
