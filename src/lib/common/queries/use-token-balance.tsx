// Hook (use-governance-token.tsx)
import { useQuery } from 'react-query';
import { useExtension } from '@common/queries';
import { useCurrentStxAddress } from '@micro-stacks/react';
import { getTokenBalance } from '@common/api';

export function useTokenBalance() {
  const currentStxAddress: any = useCurrentStxAddress();
  const { extension: governanceToken } = useExtension('Governance Token');

  const {
    isFetching,
    isIdle,
    isLoading,
    data: balance,
  } = useQuery(
    ['user-balance', `${governanceToken?.contractAddress}`],
    async () => {
      const data = await getTokenBalance(
        currentStxAddress,
        governanceToken?.contractAddress
      );
      return data;
    },
    {
      enabled: !!currentStxAddress && !!governanceToken?.contractAddress,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, balance };
}
