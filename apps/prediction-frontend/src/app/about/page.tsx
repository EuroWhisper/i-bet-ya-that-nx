import { type Metadata } from 'next';

import { AboutContent } from '../../modules/about/AboutContent';

export const metadata: Metadata = {
  title: 'I Bet Ya That - About',
};

export default function about() {
  return <AboutContent />;
}
