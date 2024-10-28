'use client';

import { createContext, useContext, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { VerificationStatus } from '@prisma/client';

import { createSearchUrl } from '../predictions/utils';

type Props = {
  children: React.ReactNode;
  initialFilters?: Filters;
};

type FilterAction = {
  type: 'SET_VERIFICATION_STATUS';
  payload: string;
};

type ParameterName = 'verificationStatus';

export type Filters = {
  verificationStatus?: VerificationStatus;
};

type OnChangeOptions = { pushUrl?: boolean };

type Fields = {
  [key in ParameterName]: {
    value: Filters[key];
    onChange: (
      value: NonNullable<Filters[key]>,
      options?: OnChangeOptions
    ) => void;
  };
};

type Context = {
  fields: Fields;
} | null;

const FiltersPredictionsContext = createContext<Context>(null);

const filterReducer = (state: Filters, action: FilterAction): Filters => {
  switch (action.type) {
    case 'SET_VERIFICATION_STATUS':
      return {
        ...state,
        verificationStatus: action.payload as VerificationStatus,
      };
    default:
      return state;
  }
};

const DEFAULT_FILTERS = {
  verificationStatus: undefined,
};

export const FiltersPredictionsProvider = ({
  children,
  initialFilters,
}: Props) => {
  const router = useRouter();

  const [state, dispatch] = useReducer(
    filterReducer,
    initialFilters ?? DEFAULT_FILTERS
  );

  const setVerificationStatus = (
    value: VerificationStatus,
    options?: OnChangeOptions
  ) => {
    if (options?.pushUrl) {
      const updatedFilters = { ...state, verificationStatus: value };

      const newSearchUrl = createSearchUrl(updatedFilters);
      router.push(newSearchUrl);
    }

    dispatch({ type: 'SET_VERIFICATION_STATUS', payload: value });
  };

  const fields: Fields = {
    verificationStatus: {
      value: state.verificationStatus,
      onChange: setVerificationStatus,
    },
  };

  const api = {
    fields,
  };

  return (
    <FiltersPredictionsContext.Provider value={api}>
      {children}
    </FiltersPredictionsContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersPredictionsContext);

  if (!context) {
    throw new Error(
      'useFilters must be used within a FiltersPredictionsContext'
    );
  }

  return context;
};
