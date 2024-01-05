// Hook (use-contracts.tsx)
import { useQuery } from 'react-query';
import { useAccount } from '@micro-stacks/react';
import { useDAO } from '@common/queries';
import { getContractsToDeploy } from '@common/api';

export function useContracts() {
  const { dao } = useDAO();
  const { stxAddress }: any = useAccount();

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    'contracts',
    async () => {
      const data: any = await getContractsToDeploy(dao?.id, stxAddress);
      return data;
    },
    {
      enabled: !!dao,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
