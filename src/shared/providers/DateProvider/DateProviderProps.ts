export interface DateProviderProps {
  compareInHours(start_date: string, end_date: string): number;
  convertToUtc(date: Date): string;
}
