// Hook (use-generate-name.tsx)
import { useQuery } from 'react-query';
import { useDAO } from '@common/queries';
import { generateContractName } from '@common/api';

export function useGenerateName() {
  const { dao } = useDAO();
  const { isFetching, isIdle, isLoading, isError, data }: any = useQuery(
    ['contract-name', dao],
    async () => {
      const data = await generateContractName(dao);
      return data;
    },
    {
      enabled: !!dao,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
