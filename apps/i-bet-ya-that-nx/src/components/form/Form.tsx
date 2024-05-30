'use client';

import {
  FieldValues,
  FormProvider,
  type SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

export { useForm, useController } from 'react-hook-form';

export type FieldValuesType = FieldValues;

type Props<V extends object> = {
  formMethods: UseFormReturn<V>;
  onSubmit: SubmitHandler<V>;
  children: React.ReactNode;
};

const Form = <V extends FieldValuesType>({
  formMethods,
  onSubmit,
  children,
}: Props<V>) => {
  return (
    <FormProvider<V> {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export { Form };
