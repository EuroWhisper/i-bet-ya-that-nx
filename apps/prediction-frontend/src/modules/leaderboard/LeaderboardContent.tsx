import { LayoutSheet, Text } from '@i-bet-ya-that-nx/ui-common';

import { PageSection } from '../../components/shared/PageSection/PageSection';
import { SharedLayout } from '../../components/shared/SharedLayout/SharedLayout';

import { LeaderboardTable } from './LeaderboardTable';
import { Leaderboard } from './types';

type Props = {
  leaderboards: Leaderboard[];
};

export const LeaderboardContent = ({ leaderboards }: Props) => {
  return (
    <SharedLayout>
      <LayoutSheet>
        <Text className="mt-8 text-center" variant="h1">
          Leaderboard
        </Text>
        {leaderboards.map((leaderboard) => (
          <PageSection key={leaderboard.title} title={leaderboard.title}>
            <LeaderboardTable leaderboard={leaderboard} />
          </PageSection>
        ))}
      </LayoutSheet>
    </SharedLayout>
  );
};
