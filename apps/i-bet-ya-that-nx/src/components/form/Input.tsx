import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    return (
      <input
        className="bg-white text-gray-800 p-3 rounded-lg w-full h-12"
        {...props}
        ref={ref}
      />
    );
  }
);

export { Input };
