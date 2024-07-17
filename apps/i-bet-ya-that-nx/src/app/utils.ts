import { format } from 'date-fns';
import { createSafeActionClient } from 'next-safe-action';

export const formatDate = (date: Date) => {
  return format(date, 'MM/dd/yyyy');
};

export const actionClient = createSafeActionClient();
