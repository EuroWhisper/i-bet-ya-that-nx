'use client';
import { forwardRef } from 'react';
import type { ToastProps } from '@radix-ui/react-toast';
import * as ToastPrimitive from '@radix-ui/react-toast';
export { ToastProvider } from '@radix-ui/react-toast';

const Toast = forwardRef<HTMLLIElement, ToastProps>((props, ref) => {
  return (
    <ToastPrimitive.Root
      open={props.open}
      onOpenChange={props.onOpenChange}
      ref={ref}
      className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
    >
      <ToastPrimitive.Description className="text-gray-800">
        {props.children}
      </ToastPrimitive.Description>
      <ToastPrimitive.Close />
    </ToastPrimitive.Root>
  );
});

Toast.displayName = 'Toast';

export { Toast };
