import { type Metadata } from 'next';
import { redirect } from 'next/navigation';

import { ProfileContent } from '../../modules/profile/ProfileContent';
import { getUserById } from '../../queries/user';
import { auth } from '../../utils';

export const metadata: Metadata = {
  title: 'I Bet Ya That - Profile',
};

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/');
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    redirect('/');
  }

  return <ProfileContent user={user} />;
};

export default ProfilePage;
