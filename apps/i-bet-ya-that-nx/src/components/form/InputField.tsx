import { forwardRef } from 'react';
import { UseControllerProps } from 'react-hook-form';

import { useController } from './Form';
import { Input } from './Input';

type Props = {
  name: string;
  rules?: UseControllerProps['rules'];
  labelClassName?: string;
} & React.HTMLProps<HTMLInputElement>;

// eslint-disable-next-line react/display-name
const InputField = forwardRef<HTMLInputElement, Props>(
  ({ name, rules, labelClassName, ...props }, ref) => {
    const { field, fieldState } = useController({ name, rules });

    return (
      <div>
        {props.label && (
          <label className={labelClassName} htmlFor={name}>
            {props.label}
          </label>
        )}
        <Input {...props} {...field} ref={ref} />
        {fieldState.error && <p>{fieldState.error?.message}</p>}
      </div>
    );
  }
);

export { InputField };
