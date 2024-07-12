import { useState, useTransition } from 'react';

type ServerAction<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

export const useServerAction = <TArgs extends unknown[], TResult>(
  action: ServerAction<TArgs, TResult>
) => {
  const [isPending, startTransition] = useTransition();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const executeAction = (...args: TArgs) => {
    setIsError(false);
    setIsSuccess(false);

    startTransition(async () => {
      try {
        await action(...args);
        setIsSuccess(true);
      } catch {
        setIsError(true);
      }
    });
  };

  return { executeAction, isPending, isError, isSuccess };
};
