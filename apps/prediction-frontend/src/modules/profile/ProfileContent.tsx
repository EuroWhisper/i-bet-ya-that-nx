import { LayoutSheet, Text } from '@i-bet-ya-that-nx/ui-common';
import { User } from '@prisma/client';

import { SharedLayout } from '../../components/shared/SharedLayout/SharedLayout';
import { UserAvatar } from '../../components/shared/UserAvatar/UserAvatar';

type Props = {
  user: User;
};

export const ProfileContent = ({ user }: Props) => {
  return (
    <SharedLayout>
      <LayoutSheet>
        <Text className="mt-8 text-center" variant="h1">
          Profile
        </Text>
        <div className="mt-4">
          <UserAvatar user={user} />
        </div>
      </LayoutSheet>
    </SharedLayout>
  );
};
