// Hook (use-governance-token.tsx)
import { useQuery } from 'react-query';
import { useCurrentStxAddress } from '@micro-stacks/react';
import { getTokenBalance } from '@common/api';
import { MEGA_GOVERNANCE_CONTRACT } from '../constants';

export function useTokenBalance() {
  const currentStxAddress: any = useCurrentStxAddress();
  const governanceToken = { contractAddress: MEGA_GOVERNANCE_CONTRACT };

  const {
    isFetching,
    isIdle,
    isLoading,
    data: balance,
  } = useQuery(
    ['user-balance', `${governanceToken?.contractAddress}`, currentStxAddress],
    async () => {
      const data = await getTokenBalance(currentStxAddress);
      return data;
    },
    {
      enabled: !!currentStxAddress && !!governanceToken?.contractAddress,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, balance };
}
