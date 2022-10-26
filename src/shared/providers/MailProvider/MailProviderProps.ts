export interface VariablesProps {
  name: string;
  link: string;
}

export interface MailProviderProps {
  sendMail(to: string, subject: string, variables: VariablesProps, path: string): Promise<void>;
}
