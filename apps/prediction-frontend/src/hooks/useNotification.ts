import { useContext } from 'react';

import { ToastContext } from '../context/ToastContext';

export const useNotification = () => {
  const notificationContext = useContext(ToastContext);

  if (!notificationContext) {
    throw new Error('useNotification must be used within a ToastProvider');
  }
  return notificationContext;
};
