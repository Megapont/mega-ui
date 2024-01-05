// Hook (use-proposal.tsx)
import { useQuery } from 'react-query';
import { useExtension } from '@common/queries';
import { getParameter } from '@common/api';

export function useVotingExtension() {
  const { extension: voting } = useExtension('Voting');

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['voting-extension', voting?.contractAddress],
    async () => {
      const executionDelay: any = await getParameter(
        voting?.contractAddress,
        'executionDelay'
      );
      return { executionDelay };
    },
    {
      enabled: !!voting,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
