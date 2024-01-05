// Hook (use-token.tsx)
import { useQuery } from 'react-query';
import { getTokenMetadata } from '@common/api';
import { contractPrincipal } from '@common/helpers';

export function useFungibleToken(tokenPrincipal: string) {
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['fungible-token', tokenPrincipal],
    async () => {
      const [contractAddress, contractName] = contractPrincipal(tokenPrincipal);
      const data = await getTokenMetadata(tokenPrincipal);
      return { contractAddress, contractName, ...data };
    },
    {
      enabled: !!tokenPrincipal,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
