import { Card, LayoutSheet, Stack, Text } from '@i-bet-ya-that-nx/ui-common';

const NotFound = () => {
  return (
    <LayoutSheet>
      <Stack
        className="h-screen"
        horizontalAlign="center"
        verticalAlign="center"
      >
        <Card>
          <Stack gap={4}>
            <Text variant="h1">404 - Not found</Text>
            <Text variant="body">
              The requested resource could not be found.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </LayoutSheet>
  );
};

export default NotFound;
