// Hook (use-governance-token.tsx)
import { useQuery } from 'react-query';
import { findExtension } from '@common/functions';

type TExtension = {
  contractAddress: string;
  ExtensionTypes?: any;
};

export function useExtension(name: string) {
  const data: TExtension = findExtension([], name);
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
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, extension };
}
