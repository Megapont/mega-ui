// Hook (use-proposal.tsx)
import { useQuery } from 'react-query';
import { getParameter } from '@common/api';
import { MEGA_VOTING_CONTRACT } from '@common/constants';

export function useVotingExtension() {
  const voting = {
    contractAddress: MEGA_VOTING_CONTRACT,
  };

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
