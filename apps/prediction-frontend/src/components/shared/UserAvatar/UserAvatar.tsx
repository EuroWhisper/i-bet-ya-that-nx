import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Stack,
  Text,
} from '@i-bet-ya-that-nx/ui-common';
import { User } from '@prisma/client';

type Props = {
  user: User;
};

export const UserAvatar = ({ user }: Props) => {
  return (
    <Stack horizontalAlign="center" verticalAlign="center" horizontal>
      <Avatar>
        {user.image && <AvatarImage src={user.image} />}
        <AvatarFallback>{user.nickname[0]}</AvatarFallback>
      </Avatar>
      <Text className="ml-4 text-center text-gray-500" variant="h3">
        {user.nickname}
      </Text>
    </Stack>
  );
};
