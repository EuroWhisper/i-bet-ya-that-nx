import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@i-bet-ya-that-nx/ui-common';

import { Leaderboard } from './types';

type Props = {
  leaderboard: Leaderboard;
};

export const LeaderboardTable = ({ leaderboard }: Props) => {
  const categoryHeading =
    leaderboard.category === 'correct'
      ? 'Correct predictions'
      : 'Incorrect predictions';

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">{categoryHeading}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard.rankings.map((ranking, index) => (
          <TableRow key={ranking.nickname}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{ranking.nickname}</TableCell>
            <TableCell className="text-right">{ranking.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
