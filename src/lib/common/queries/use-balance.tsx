// Hook (use-balance.tsx)
import { useQuery } from 'react-query';
//import { useExtension } from '@common/queries';
import { getBalanceOf } from '@common/api';

export function useBalance(assetAddress: string) {
  //const { extension: vault } = useExtension('Vault');
  const vault = {
    contractAddress: 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X.mega-vault',
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
