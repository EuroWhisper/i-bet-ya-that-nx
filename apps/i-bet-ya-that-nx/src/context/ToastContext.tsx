import { createContext, useCallback, useState } from 'react';
import { Toast, ToastViewport } from '@i-bet-ya-that-nx/ui-common';
import * as RadixToast from '@radix-ui/react-toast';
import { v4 as uuidv4 } from 'uuid';

export const ToastContext = createContext<(args: NotifyArgs) => void>(() => {
  // Default no-op function to avoid null checks
  /* no-op */
});

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<QueuedToast[]>([]);

  const notify = useCallback(
    ({ title, description, type = 'info', duration = 8000 }: NotifyArgs) => {
      const id = uuidv4();

      setToasts((prevToasts) => [
        ...prevToasts,
        { id, title, description, type },
      ]);

      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, duration);
    },
    []
  );
  return (
    <ToastContext.Provider value={notify}>
      <>
        {children}
        <RadixToast.Provider swipeDirection="right">
          <ToastViewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
          {toasts.map((toast) => (
            <Toast key={toast.id} open>
              {toast.description}
            </Toast>
          ))}
        </RadixToast.Provider>
      </>
    </ToastContext.Provider>
  );
};

type ToastProviderProps = {
  children: React.ReactNode;
};

type QueuedToast = {
  id: string;
  title?: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

type NotifyArgs = {
  title?: string;
  description: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
};
