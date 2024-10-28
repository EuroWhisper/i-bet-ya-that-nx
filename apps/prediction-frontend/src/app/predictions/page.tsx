import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { VerificationStatus } from '@prisma/client';

import { PredictionsOverviewContent } from '../../modules/predictions/predictions-overview/PredictionsOverviewContent';
import { getPredictionsByEmail } from '../../queries';
import { auth } from '../../utils';

export const metadata: Metadata = {
  title: 'I Bet Ya That - Predictions',
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PredictionsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect('/');
  }

  const searchParameters = await searchParams;

  const getFiltersFromSearchParams = () => {
    const filters = {
      verificationStatus:
        searchParameters.verificationStatus as VerificationStatus,
    };

    return filters;
  };

  const filters = getFiltersFromSearchParams();

  const predictions = await getPredictionsByEmail(session.user.email, filters);

  return (
    <PredictionsOverviewContent
      predictions={predictions}
      initialFilters={filters}
    />
  );
}
