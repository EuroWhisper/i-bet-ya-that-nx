import { UseControllerProps } from 'react-hook-form';
import { useController } from './Form';
import { Input } from './Input';
import { forwardRef } from 'react';

type Props = {
  name: string;
  rules?: UseControllerProps['rules'];
} & React.HTMLProps<HTMLInputElement>;

// eslint-disable-next-line react/display-name
const InputField = forwardRef<HTMLInputElement, Props>(
  ({ name, rules, ...props }, ref) => {
    const { field, fieldState } = useController({ name, rules });

    return (
      <div>
        {props.label && <label htmlFor={name}>{props.label}</label>}
        <Input {...props} {...field} ref={ref} />
        {fieldState.error && <p>{fieldState.error?.message}</p>}
      </div>
    );
  }
);

export { InputField };
