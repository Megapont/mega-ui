// Hook (use-proposals.tsx)
import { useQuery } from 'react-query';
import { getDBProposals } from '@common/api';

export function useProposals(filter = 'all') {
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['proposals', filter],
    async () => {
      const data = await getDBProposals(filter);
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
