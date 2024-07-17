import { Stack, Text } from '@i-bet-ya-that-nx/ui-common';

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  title: string;
};

export const PageSection = ({ as, children, className, title }: Props) => {
  return (
    <Stack as={as} gap={2}>
      <Text className="mt-8" variant="h2">
        {title}
      </Text>
      {children}
    </Stack>
  );
};
