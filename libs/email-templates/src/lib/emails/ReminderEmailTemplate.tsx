import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import tailwindConfig from '../tawilwindConfig';

type Props = {
  prediction: string;
  predictionDate: string;
  verificationUrl: string;
};

export const ReminderEmailTemplate = ({
  prediction,
  predictionDate,
  verificationUrl,
}: Props) => {
  return (
    <Html>
      <Tailwind config={tailwindConfig}>
        <Head />
        <Preview>Verify Your Prediction</Preview>
        <Body className="bg-gray-100 flex justify-center items-center min-h-screen">
          <Container className="mx-auto my-4 p-6 bg-white rounded shadow-md max-w-lg">
            <Heading className="text-2xl font-bold mb-4 text-center">
              {`You predicted that by ${predictionDate}, the following event would occur:`}
            </Heading>
            <Text className="text-lg mb-4 text-center">{`"${prediction}"`}</Text>
            <Text className="text-base mb-6 text-center">
              It's time for you to verify if your prediction is correct.
            </Text>
          </Container>
          <Button
            className="px-6 py-3 bg-red-500 text-white rounded hover:bg-blue-600 mx-auto"
            href={verificationUrl}
          >
            Verify Prediction
          </Button>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ReminderEmailTemplate;
