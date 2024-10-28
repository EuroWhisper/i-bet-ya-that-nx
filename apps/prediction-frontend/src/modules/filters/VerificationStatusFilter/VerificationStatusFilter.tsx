import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@i-bet-ya-that-nx/ui-common';
import { VerificationStatus } from '@prisma/client';

import { useFilters } from '../FiltersPredictionsProvider';

const mapVerificationStatusToOptions = () => {
  return [
    { label: 'Pending', value: VerificationStatus.PENDING },
    { label: 'Reminder sent', value: VerificationStatus.REMINDER_EMAIL_SENT },
    { label: 'Verified correct', value: VerificationStatus.VERIFIED_CORRECT },
    {
      label: 'Verified incorrect',
      value: VerificationStatus.VERIFIED_INCORRECT,
    },
  ];
};

export const VerificationStatusFilter = () => {
  const { fields } = useFilters();

  const options = mapVerificationStatusToOptions();

  return (
    <Select
      value={fields.verificationStatus.value}
      onValueChange={(value) =>
        fields.verificationStatus.onChange(value as VerificationStatus, {
          pushUrl: true,
        })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
