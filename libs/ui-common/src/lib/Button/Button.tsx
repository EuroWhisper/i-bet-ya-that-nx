import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, disabled, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'w-full h-12 p-2 rounded-lg text-white',
        disabled ? 'bg-gray-400' : 'bg-red-500'
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
