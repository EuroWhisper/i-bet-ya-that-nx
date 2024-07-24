import { format } from 'date-fns';

export const formatDate = (date: Date) => {
  return format(date, 'MM/dd/yyyy');
};

export type DateRangeType = 'day' | 'week' | 'month' | 'allTime';

export const getDateRange = (rangeType: DateRangeType) => {
  const now = new Date();
  let startDate: Date;

  switch (rangeType) {
    case 'day':
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1
      );
      break;
    case 'week':
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );
      break;
    case 'month':
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      break;
    case 'allTime':
      startDate = new Date(0); // Epoch time
      break;
    default:
      throw new Error('Invalid range type');
  }

  return { startDate, endDate: now };
};
