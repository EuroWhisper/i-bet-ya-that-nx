import Image from 'next/image';
import { HomeForm } from './HomeForm';

type Props = {
  predictionSuggestion: string;
};

const HomeContent = ({ predictionSuggestion }: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br	from-[#FF4B12] to-[#4200FF]">
      <Image
        alt="Gambling doberman"
        src="/mascot.svg"
        width={320}
        height={320}
        priority
      />
      <h1 className="font-fugaz text-6xl mt-4">I bet ya that...</h1>
      <div className="mt-8 w-[32rem]">
        <HomeForm predictionSuggestion={predictionSuggestion} />
      </div>
    </main>
  );
};

export { HomeContent };
