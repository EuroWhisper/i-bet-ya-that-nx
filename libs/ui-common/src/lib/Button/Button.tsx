import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, disabled, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'w-full h-12 p-2 rounded-lg bg-red-500 text-white',
        disabled && 'bg-gray-400'
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
