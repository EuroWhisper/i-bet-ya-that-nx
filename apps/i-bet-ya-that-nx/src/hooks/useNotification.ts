import { useContext } from 'react';

import { ToastContext } from '../context/ToastContext';

export const useNotification = () => {
  return useContext(ToastContext);
};
