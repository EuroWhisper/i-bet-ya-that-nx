'use client';
import { forwardRef } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import {
  IconAlertCircle,
  IconCircleCheck,
  IconCircleX,
  IconInfoCircle,
} from '@tabler/icons-react';
import { Stack } from '../Stack/Stack';
export { ToastProvider } from '@radix-ui/react-toast';

type Props = {
  open: boolean;
  children: React.ReactNode;
  type: ToastType;
};

const getToastIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <IconCircleCheck className="stroke-green-600" />;
    case 'error':
      return <IconCircleX className="stroke-red-600" />;
    case 'warning':
      return <IconAlertCircle className="stroke-yellow-600" />;
    case 'info':
      return <IconInfoCircle className="stroke-blue-600" />;
  }
};

const Toast = forwardRef<HTMLLIElement, Props>(
  ({ open, type, children }, ref) => {
    const IconComponent = getToastIcon(type);

    return (
      <ToastPrimitive.Root
        open={open}
        ref={ref}
        className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
      >
        <ToastPrimitive.Description className="text-gray-800">
          <Stack gap={2} horizontal>
            {IconComponent}
            {children}
          </Stack>
        </ToastPrimitive.Description>
        <ToastPrimitive.Close />
      </ToastPrimitive.Root>
    );
  }
);

Toast.displayName = 'Toast';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export { Toast, ToastType };
