import clsx from 'clsx';

type Props = {
  as?: React.ElementType;
  horizontal?: boolean;
  horizontalAlign?: keyof typeof justifyContentMap;
  verticalAlign?: keyof typeof alignItemsMap;
  gap?: number; // Define the gap prop as a number
  className?: string;
  children: React.ReactNode;
};

// Map the justify content values to the corresponding tailwind classes
const justifyContentMap = {
  center: 'justify-center',
  start: 'justify-start',
  end: 'justify-end',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
};

// Map the align items values to the corresponding tailwind classes
const alignItemsMap = {
  center: 'items-center',
  start: 'items-start',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

// Map the gap values to the corresponding tailwind classes
const gapMap: Record<number, string> = {
  0: 'gap-0',
  0.5: 'gap-0.5',
  1: 'gap-1',
  1.5: 'gap-1.5',
  2: 'gap-2',
  2.5: 'gap-2.5',
  3: 'gap-3',
  3.5: 'gap-3.5',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  7: 'gap-7',
  8: 'gap-8',
  9: 'gap-9',
  10: 'gap-10',
  11: 'gap-11',
  12: 'gap-12',
  14: 'gap-14',
  16: 'gap-16',
  20: 'gap-20',
  24: 'gap-24',
  28: 'gap-28',
  32: 'gap-32',
  36: 'gap-36',
  40: 'gap-40',
  44: 'gap-44',
  48: 'gap-48',
  52: 'gap-52',
  56: 'gap-56',
  60: 'gap-60',
  64: 'gap-64',
  72: 'gap-72',
  80: 'gap-80',
  96: 'gap-96',
};

export const Stack = ({
  as,
  horizontal = false,
  horizontalAlign,
  verticalAlign,
  gap,
  className,
  children,
}: Props) => {
  const Component = as ?? 'div';

  const flexDirectionClass = horizontal ? 'flex-row' : 'flex-col';
  const justifyContentClass = horizontalAlign
    ? justifyContentMap[horizontalAlign]
    : '';
  const alignItemsClass = verticalAlign ? alignItemsMap[verticalAlign] : '';
  const gapClass = gap !== undefined ? gapMap[gap] : '';

  return (
    <Component
      className={clsx(
        'flex',
        flexDirectionClass,
        justifyContentClass,
        alignItemsClass,
        gapClass,
        className
      )}
    >
      {children}
    </Component>
  );
};
