// Hook (use-proposal.tsx)
import { useQuery } from 'react-query';
import { getProposal } from '@common/api';
import { MEGA_VOTING_CONTRACT } from '../constants';

export function useProposal(id: string) {
  const voting = { contractAddress: MEGA_VOTING_CONTRACT };

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['proposal', id],
    async () => {
      const contractAddress = voting?.contractAddress.split('.')[0];
      const contractName = voting?.contractAddress.split('.')[1];
      const data = await getProposal(`${contractAddress}.${contractName}`, id);
      return data;
    },
    {
      enabled: !!voting?.contractAddress,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
