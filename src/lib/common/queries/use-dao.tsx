// Hook (use-dao.tsx)
import { useQuery } from 'react-query';
import { getDAO } from '@common/api';
import { useRouter } from 'next/router';

export function useDAO() {
  const router = useRouter();
  const { dao: slug } = router.query as any;
  const {
    isFetching,
    isIdle,
    isLoading,
    isError,
    data: dao,
  }: any = useQuery(
    ['dao', slug],
    async () => {
      const data = await getDAO(slug);
      return data;
    },
    {
      enabled: !!slug,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, dao };
}
