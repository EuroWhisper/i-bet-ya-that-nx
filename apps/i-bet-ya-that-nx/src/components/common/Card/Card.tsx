import clsx from 'clsx';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Card = ({ className, children }: Props) => {
  return (
    <div
      className={clsx(
        'p-4 rounded-md border dark:border-none bg-white dark:bg-gray-600 shadow-lg dark:shadow-none',
        className
      )}
    >
      {children}
    </div>
  );
};
