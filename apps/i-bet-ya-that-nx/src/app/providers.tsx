'use client';

import * as RadixToast from '@radix-ui/react-toast';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <RadixToast.Provider swipeDirection="right">{children}</RadixToast.Provider>
  );
};

export { Providers };
