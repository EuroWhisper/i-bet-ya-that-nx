import clsx from 'clsx';
import { Spinner } from '../Spinner/Spinner';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const getButtonSizeClass = (size: Props['size']) => {
  switch (size) {
    case 'small':
      return 'h-8';
    case 'medium':
      return 'h-12';
    case 'large':
      return 'h-16';
    default:
      return 'h-12';
  }
};

const Button = ({ children, size, isLoading, disabled, ...props }: Props) => {
  const buttonSizeClass = getButtonSizeClass(size);
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={clsx(
        'w-full p-2 rounded-lg text-white',
        buttonSizeClass,
        isDisabled ? 'bg-gray-400' : 'bg-red-500'
      )}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export { Button };
