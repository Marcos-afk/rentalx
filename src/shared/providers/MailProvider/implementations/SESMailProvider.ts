import { SES } from 'aws-sdk';
import { MailProviderProps, VariablesProps } from '../MailProviderProps';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

export class SESMailProvider implements MailProviderProps {
  private cliente: Transporter;

  constructor() {
    this.cliente = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail(to: string, subject: string, variables: VariablesProps, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);
    const templateHtml = templateParse(variables);

    await this.cliente.sendMail({
      to,
      from: process.env.SES_AWS_EMAIL,
      subject,
      html: templateHtml,
    });
  }
}
