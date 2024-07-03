import { Card } from '../../common/Card/Card';
import { Stack } from '../../common/Stack/Stack';

type Props = {
  email: string;
  prediction: string;
};

export const PredictionCard = ({ email, prediction }: Props) => {
  return (
    <Card>
      <Stack gap={3}>
        <h3 className="text-lg font-bold">{email}</h3>
        <p className="text-gray-600">{prediction}</p>
      </Stack>
    </Card>
  );
};
