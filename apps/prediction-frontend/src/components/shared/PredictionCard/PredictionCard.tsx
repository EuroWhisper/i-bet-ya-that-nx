import {
  Button,
  Card,
  Spinner,
  Stack,
  Text,
} from '@i-bet-ya-that-nx/ui-common';
import { TrashIcon } from 'lucide-react';

type Props = {
  id: number;
  email: string;
  prediction: string;
  date: string;
  isDeleting?: boolean;
  onDelete?: (id: number) => void;
};

export const PredictionCard = ({
  id,
  email,
  prediction,
  date,
  isDeleting,
  onDelete,
}: Props) => {
  return (
    <Card className="relative">
      {onDelete && (
        <div className="absolute right-2 top-2">
          <Button
            className="size-4"
            disabled={isDeleting}
            size="icon"
            variant="ghost"
            onClick={() => onDelete(id)}
          >
            {isDeleting ? <Spinner /> : <TrashIcon />}
          </Button>
        </div>
      )}
      <Stack gap={3}>
        <Stack gap={1}>
          <Text
            className="text-gray-600 dark:text-gray-200 font-bold"
            variant="small"
          >
            {email}
          </Text>
          <Text className="text-gray-400 dark:text-gray-50" variant="xs">
            {date}
          </Text>
        </Stack>
        <div>
          <Text className="text-gray-600 dark:text-white  line-clamp-3">
            {prediction}
          </Text>
        </div>
      </Stack>
    </Card>
  );
};
