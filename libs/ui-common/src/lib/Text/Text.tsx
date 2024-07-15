import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  variant?: 'body' | 'h1' | 'h2' | 'h3' | 'small' | 'xs';
  italic?: boolean;
  className?: string;
  children: ReactNode;
};

const getTextSizeClass = (variant: Props['variant']) => {
  switch (variant) {
    case 'h1':
      return 'text-3xl';
    case 'h2':
      return 'text-2xl';
    case 'h3':
      return 'text-xl';
    case 'body':
      return 'text-base';
    case 'small':
      return 'text-sm';
    case 'xs':
      return 'text-xs';
    default:
      return 'text-base';
  }
};

const getComponent = (variant: Props['variant']) => {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'body':
      return 'p';
    case 'small':
      return 'small';
    case 'xs':
      return 'span';
    default:
      return 'p';
  }
};

export const Text = ({ variant, italic, className, children }: Props) => {
  const Component = getComponent(variant);
  const textSizeClass = getTextSizeClass(variant);

  return (
    <Component className={clsx(textSizeClass, italic && 'italic', className)}>
      {children}
    </Component>
  );
};
