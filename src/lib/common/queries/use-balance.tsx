// Hook (use-balance.tsx)
import { useQuery } from 'react-query';
import { getBalanceOf } from '@common/api';
import { MEGA_VAULT_CONTRACT } from '@common/constants';

export function useBalance(assetAddress: string) {
  const vault = {
    contractAddress: MEGA_VAULT_CONTRACT,
  };

  const { isFetching, isIdle, isLoading, data } = useQuery(
    ['vault-balance', vault?.contractAddress, assetAddress],
    async () => {
      const data = await getBalanceOf(vault?.contractAddress, assetAddress);
      return data;
    },
    {
      enabled: !!assetAddress && !!vault?.contractAddress,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, data };
}
