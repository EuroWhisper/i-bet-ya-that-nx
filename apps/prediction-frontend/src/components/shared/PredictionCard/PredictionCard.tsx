import { Card, Stack, Text } from '@i-bet-ya-that-nx/ui-common';

type Props = {
  email: string;
  prediction: string;
  date: string;
};

export const PredictionCard = ({ email, prediction, date }: Props) => {
  return (
    <Card>
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
