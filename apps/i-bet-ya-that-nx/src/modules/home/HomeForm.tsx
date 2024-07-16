'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Calendar,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputField,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@i-bet-ya-that-nx/ui-common';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { createPrediction } from '../../app/actions';
import { useNotification, useServerAction } from '../../hooks';

import { predictionSchema } from './predictionSchema';
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

  const notify = useNotification();

  const formMethods = useForm<HomeFormData>({
    resolver: zodResolver(predictionSchema),
    defaultValues,
  });

  const [shouldShowFullForm, setShouldShowFullForm] = useState(false);

  useEffect(() => {
    if (formMethods.formState.isDirty) {
      setShouldShowFullForm(true);
    }
  }, [formMethods.formState.isDirty, setShouldShowFullForm]);

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(async (data) => {
          await executeAction(
            data.prediction,
            new Date(data.confirmationDate),
            data.email
          );
          formMethods.reset(defaultValues);
          notify({
            description: 'Your prediction has been saved successfully',
            type: 'success',
          });
        })}
      >
        <InputField
          name="prediction"
          placeholder={predictionSuggestion}
          type="text"
        />
        {shouldShowFullForm && (
          <div>
            <div className="mt-3 flex justify-between items-end gap-4">
              <div className="w-full">
                <FormField
                  control={formMethods.control}
                  name="confirmationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Verify on</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                              variant={'outline'}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            mode="single"
                            selected={field.value as unknown as Date}
                            initialFocus
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <InputField name="email" placeholder="Email" type="email" />
              </div>
            </div>
            <div className="mt-4">
              <Button
                className="bg-red-600 hover:bg-red-300 text-white w-full"
                type="submit"
              >
                Make prediction
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export { HomeForm };
