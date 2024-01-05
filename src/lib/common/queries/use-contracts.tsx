// Hook (use-contracts.tsx)
import { useQuery } from 'react-query';
import { useAccount } from '@micro-stacks/react';
import { getContractsToDeploy } from '@common/api';

export function useContracts() {
  const { stxAddress }: any = useAccount();

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    'contracts',
    async () => {
      const data: any = await getContractsToDeploy(stxAddress);
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
