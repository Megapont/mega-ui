// Hook (use-contracts.tsx)
import { useQuery } from 'react-query';
import { useAccount } from '@micro-stacks/react';
import { useDAO } from '@common/queries';
import { getDelegates } from '@common/api';

export function useDelegates() {
  const { dao } = useDAO();
  const { stxAddress } = useAccount();

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['delegates', dao?.name, stxAddress],
    async () => {
      const data: any = await getDelegates(dao?.id, stxAddress as string);
      return data;
    },
    {
      enabled: !!dao,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
