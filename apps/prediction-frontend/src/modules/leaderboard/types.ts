type Ranking = {
  email: string;
  count: number;
};

export type LeaderboardCategory = 'correct' | 'incorrect';

export type Leaderboard = {
  title: string;
  category: LeaderboardCategory;
  rankings: Ranking[];
};
