import { type Metadata } from 'next';
import { redirect } from 'next/navigation';

import { PredictionsOverviewContent } from '../../modules/predictions/predictions-overview/PredictionsOverviewContent';
import { getPredictionsByEmail } from '../../queries';
import { auth } from '../../utils';

export const metadata: Metadata = {
  title: 'I Bet Ya That - Predictions',
};

export default async function PredictionsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect('/');
  }

  const predictions = await getPredictionsByEmail(session.user.email);

  return <PredictionsOverviewContent predictions={predictions} />;
}
