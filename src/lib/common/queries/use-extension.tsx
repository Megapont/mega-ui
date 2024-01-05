// Hook (use-governance-token.tsx)
import { useQuery } from 'react-query';
import { useDAO } from '@common/queries';
import { findExtension } from '@common/functions';

type TExtension = {
  contractAddress: string;
  ExtensionTypes?: any;
};

export function useExtension(name: string) {
  const { dao } = useDAO();
  const data: TExtension = findExtension(dao?.Extensions, name);
  const {
    isFetching,
    isIdle,
    isLoading,
    isError,
    data: extension,
  }: any = useQuery(
    `extension-${name}`,
    () => {
      return data;
    },
    {
      enabled: !!dao,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, extension };
}
