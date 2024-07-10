import { useTransition } from 'react';

type ServerAction<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

export const useServerAction = <TArgs extends unknown[], TResult>(
  action: ServerAction<TArgs, TResult>
) => {
  const [isPending, startTransition] = useTransition();

  const executeAction = (...args: TArgs) => {
    startTransition(() => {
      action(...args);
    });
  };

  return [executeAction, isPending] as const;
};
