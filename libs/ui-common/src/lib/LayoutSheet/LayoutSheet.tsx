import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
};

export const LayoutSheet = ({ children, fullWidth, className }: Props) => {
  return (
    <div
      className={clsx(
        'px-4 mx-auto',
        fullWidth ? 'w-full' : 'max-w-7xl',
        className
      )}
    >
      {children}
    </div>
  );
};
