import { type Metadata } from 'next';

import { LeaderboardContent } from '../../modules/leaderboard/LeaderboardContent';
import { type Leaderboard } from '../../modules/leaderboard/types';
import { getLeaderboard } from '../../queries/leaderboard';

export const metadata: Metadata = {
  title: 'I Bet Ya That - Leaderboard',
};

export default async function LeaderboardPage() {
  const allTimeMostCorrectRankings = await getLeaderboard(
    'allTime',
    'VERIFIED_CORRECT'
  );
  const dailyMostCorrectRankings = await getLeaderboard(
    'day',
    'VERIFIED_CORRECT'
  );
  const weeklyMostCorrectRankings = await getLeaderboard(
    'week',
    'VERIFIED_CORRECT'
  );
  const monthlyMostCorrectRankings = await getLeaderboard(
    'month',
    'VERIFIED_CORRECT'
  );

  const allTimeMostCorrectLeaderboard: Leaderboard = {
    title: 'All time',
    category: 'correct',
    rankings: allTimeMostCorrectRankings,
  };

  const dailyMostCorrectLeaderboard: Leaderboard = {
    title: 'Daily',
    category: 'correct',
    rankings: dailyMostCorrectRankings,
  };

  const weeklyMostCorrectLeaderboard: Leaderboard = {
    title: 'Weekly',
    category: 'correct',
    rankings: weeklyMostCorrectRankings,
  };

  const monthlyMostCorrectLeaderboard: Leaderboard = {
    title: 'Monthly',
    category: 'correct',
    rankings: monthlyMostCorrectRankings,
  };

  return (
    <LeaderboardContent
      leaderboards={[
        allTimeMostCorrectLeaderboard,
        dailyMostCorrectLeaderboard,
        weeklyMostCorrectLeaderboard,
        monthlyMostCorrectLeaderboard,
      ]}
    />
  );
}
