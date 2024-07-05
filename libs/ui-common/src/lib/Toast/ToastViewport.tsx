'use client';

import { ToastViewport as RadixToastViewport } from '@radix-ui/react-toast';

type Props = {
  className: string;
};

export const ToastViewport = ({ className }: Props) => (
  <RadixToastViewport className={className} />
);
