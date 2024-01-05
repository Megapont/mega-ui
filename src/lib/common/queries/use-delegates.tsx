// Hook (use-contracts.tsx)
import { useQuery } from 'react-query';
import { useAccount } from '@micro-stacks/react';
import { getDelegates } from '@common/api';

export function useDelegates() {
  const { stxAddress } = useAccount();

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['delegates', stxAddress],
    async () => {
      const data: any = await getDelegates(stxAddress as string);
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
