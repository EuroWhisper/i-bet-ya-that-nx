'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form/Form';
import { Input } from './Input';

type Props = {
  className?: string;
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  type?: React.HTMLInputTypeAttribute;
};

export const InputField = ({
  className,
  name,
  label,
  placeholder,
  helperText,
  type,
}: Props) => {
  const formMethods = useFormContext();

  return (
    <FormField
      control={formMethods.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className={className}
              placeholder={placeholder}
              type={type ?? 'text'}
              {...field}
            />
          </FormControl>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
