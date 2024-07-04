import clsx from 'clsx';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Card = ({ className, children }: Props) => {
  return (
    <div
      className={clsx(
        'p-4 rounded-md border bg-white text-gray-800 shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};
