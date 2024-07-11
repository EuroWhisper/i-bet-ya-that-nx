'use client';

import { useEffect, useState } from 'react';
import { Button } from '@i-bet-ya-that-nx/ui-common';
import { Toast } from '@i-bet-ya-that-nx/ui-common';

import { createPrediction } from '../../app/actions';
import { Form, useForm } from '../../components/form/Form';
import { InputField } from '../../components/form/InputField';
import { useServerAction } from '../../hooks';

import { HomeFormData } from './types';

type Props = {
  predictionSuggestion: string;
};

const defaultValues: HomeFormData = {
  prediction: '',
  confirmationDate: '',
  email: '',
};

const HomeForm = ({ predictionSuggestion }: Props) => {
  const { executeAction, isPending } = useServerAction(createPrediction);

  const [open, setOpen] = useState(false);

  const formMethods = useForm<HomeFormData>({
    defaultValues,
  });

  const [shouldShowFullForm, setShouldShowFullForm] = useState(false);

  useEffect(() => {
    if (formMethods.formState.isDirty) {
      setShouldShowFullForm(true);
    }
  }, [formMethods.formState.isDirty, setShouldShowFullForm]);

  return (
    <Form
      formMethods={formMethods}
      onSubmit={async (data) => {
        await executeAction(
          data.prediction,
          new Date(data.confirmationDate),
          data.email
        );
        formMethods.reset(defaultValues);
        setOpen(true);
      }}
    >
      <InputField
        name="prediction"
        placeholder={predictionSuggestion}
        rules={{ required: 'Prediction is required' }}
        type="text"
      />
      {shouldShowFullForm && (
        <div>
          <div className="mt-3 flex justify-between items-end gap-4">
            <div className="w-full">
              <InputField
                label="Verify on"
                labelClassName="text-white"
                name="confirmationDate"
                placeholder="Date"
                rules={{ required: 'Date is required' }}
                type="date"
              />
            </div>
            <div className="w-full">
              <InputField
                name="email"
                placeholder="Email"
                rules={{ required: 'Email is required' }}
                type="email"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button disabled={isPending} type="submit">
              Make prediction
            </Button>
          </div>
        </div>
      )}
      <Toast open={open} onOpenChange={setOpen}>
        <h2>Saved successfully!</h2>
      </Toast>
    </Form>
  );
};

export { HomeForm };
