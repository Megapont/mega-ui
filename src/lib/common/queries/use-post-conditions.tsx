// Hook (use-contracts.tsx)
import { useQuery } from 'react-query';
import { useDAO } from '@common/queries';
import { getPostConditions } from '@common/api';

export function usePostConditions(proposalPrincipal: string) {
  const { dao } = useDAO();

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['post-conditions', proposalPrincipal],
    async () => {
      const data: any = await getPostConditions(proposalPrincipal);
      return data;
    },
    {
      enabled: !!dao && !!proposalPrincipal,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
