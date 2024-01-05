// Hook (use-generate-name.tsx)
import { useQuery } from 'react-query';
import { generateContractName } from '@common/api';

export function useGenerateName() {
  const { isFetching, isIdle, isLoading, isError, data }: any = useQuery(
    ['contract-name'],
    async () => {
      const data = await generateContractName();
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
