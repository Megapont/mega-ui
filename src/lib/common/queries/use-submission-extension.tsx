// Hook (use-proposal.tsx)
import { useQuery } from 'react-query';
import { useExtension } from '@common/queries';
import { getParameter } from '@common/api';

export function useSubmissionExtension() {
  const { extension: submission } = useExtension('Submission');

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['submission-extension', submission?.contractAddress],
    async () => {
      const minimumProposalStartDelay: any = await getParameter(
        submission?.contractAddress,
        'minimumProposalStartDelay'
      );
      const proposalDuration: any = await getParameter(
        submission?.contractAddress,
        'proposalDuration'
      );
      return { minimumProposalStartDelay, proposalDuration };
    },
    {
      enabled: !!submission,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
