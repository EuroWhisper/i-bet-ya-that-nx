import { Text } from '@i-bet-ya-that-nx/ui-common';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-center items-center min-h-40 bg-gradient-to-r from-[#FF4B12] to-[#4200FF] dark:from-gray-700 dark:to-gray-900">
      <Text className="text-white">{`© ${currentYear} Laurence Juden`}</Text>
    </footer>
  );
};
