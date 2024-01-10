// Hook (use-proposal.tsx)
import { useQuery } from 'react-query';
import { getParameter } from '@common/api';
import { MEGA_SUBMISSION_CONTRACT } from '@common/constants';

export function useSubmissionExtension() {
  const submission = {
    contractAddress: MEGA_SUBMISSION_CONTRACT,
  };

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
      const proposeThreshold: any = await getParameter(
        submission?.contractAddress,
        'proposeThreshold'
      );
      return { minimumProposalStartDelay, proposalDuration, proposeThreshold };
    },
    {
      enabled: !!submission,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
