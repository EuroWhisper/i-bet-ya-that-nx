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
        <Stack>
          <h3 className="text-lg font-bold">{email}</h3>
          <p className="text-sm text-blue-400">{date}</p>
        </Stack>
        <p className="text-gray-600">{prediction}</p>
      </Stack>
    </Card>
  );
};
