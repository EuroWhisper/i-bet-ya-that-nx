import { Stack } from '../../../../../../libs/ui-common/src/lib/Stack/Stack';

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  title: string;
};

export const PageSection = ({ as, children, className, title }: Props) => {
  return (
    <Stack as={as} gap={2}>
      <h2 className="text-2xl mt-8">{title}</h2>
      {children}
    </Stack>
  );
};
