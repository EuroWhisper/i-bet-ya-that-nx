import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'I Bet Ya That - About',
};

export default function about() {
  return (
    <div className="bg-red-500">
      <h2>About</h2>
    </div>
  );
}
