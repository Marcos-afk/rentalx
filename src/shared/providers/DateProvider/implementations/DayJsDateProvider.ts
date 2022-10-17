import { DateProviderProps } from '../DateProviderProps';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export class DayJsDateProvider implements DateProviderProps {
  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: string, end_date: string): number {
    const compareDate = dayjs(end_date).diff(start_date, 'hours');
    return compareDate;
  }
}
