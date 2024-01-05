// Hook (use-proposals.tsx)
import { useQuery } from 'react-query';
import { useDAO } from '@common/queries';
import { getDBProposals } from '@common/api';

export function useProposals(filter = 'all') {
  const { dao } = useDAO();

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['proposals', dao?.name, filter],
    async () => {
      const data = await getDBProposals(dao?.id, filter);
      return data;
    },
    {
      enabled: !!dao,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
