import { Card } from '../../common/Card/Card';
import { Stack } from '../../common/Stack/Stack';

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
          <p className="text-sm text-gray-600 dark:text-gray-200 font-bold">
            {email}
          </p>
          <h3 className="text-xs text-gray-400 dark:text-gray-50">{date}</h3>
        </Stack>
        <div>
          <p className="text-gray-600 dark:text-white  line-clamp-3">
            {prediction}
          </p>
        </div>
      </Stack>
    </Card>
  );
};
