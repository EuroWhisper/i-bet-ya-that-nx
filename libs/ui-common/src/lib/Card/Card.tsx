import clsx from 'clsx';

type Props = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export const Card = ({ as, className, children }: Props) => {
  const Comp = as ?? 'div';
  return (
    <Comp
      className={clsx(
        'p-4 rounded-md border dark:border-none bg-white dark:bg-gray-600 shadow-lg dark:shadow-none',
        className
      )}
    >
      {children}
    </Comp>
  );
};
