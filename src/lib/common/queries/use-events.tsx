// Hook (use-events.tsx)
import { useQuery } from 'react-query';
import { getEvents } from '@common/api';

export function useEvents(
  extensionAddress: string,
  eventName: string | undefined,
  filterByProposal: string | undefined,
  offset: number
) {
  const { isFetching, isIdle, isLoading, isError, data }: any = useQuery(
    `events-${extensionAddress}-${eventName}`,
    async () => {
      const data = await getEvents({
        extensionAddress,
        eventName,
        filterByProposal,
        offset,
      });
      return data;
    },
    {
      enabled: !!extensionAddress,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
