/* eslint-disable no-console */
import { MailProviderProps, VariablesProps } from '../MailProviderProps';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

export class EtherealMailProvider implements MailProviderProps {
  private cliente: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.cliente = transporter;
      })
      .catch(err => console.log(err));
  }

  async sendMail(to: string, subject: string, variables: VariablesProps, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);
    const templateHtml = templateParse(variables);

    const message = await this.cliente.sendMail({
      to,
      from: 'Rentalx <rentalx@admin.com.br>',
      subject,
      html: templateHtml,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
