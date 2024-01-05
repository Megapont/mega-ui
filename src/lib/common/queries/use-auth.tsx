// Hook (use-auth.tsx)
import { useQuery } from 'react-query';
import { useAuth as useMicroStacks } from '@micro-stacks/react';
import { useExtension, useTokenBalance } from '@common/queries';
import { getParameter } from '@common/api';

export function useAuth() {
  const { balance } = useTokenBalance();
  const { extension: submission } = useExtension('Submission');
  const { extension: voting } = useExtension('Voting');
  const { isSignedIn } = useMicroStacks();
  const signedInOptions = {
    enabled:
      !!voting?.contractAddress && !!submission?.contractAddress && !!balance,
    refetchOnWindowFocus: false,
  };
  const signedOutOptions = {
    enabled: !!voting?.contractAddress && !!submission?.contractAddress,
    refetchOnWindowFocus: false,
  };

  const {
    isFetching,
    isIdle,
    isLoading,
    isError,
    data: proposeData,
  } = useQuery(
    ['propose-threshold'],
    async () => {
      const contractAddress = submission?.contractAddress.split('.')[0];
      const contractName = submission?.contractAddress.split('.')[1];
      const proposeThreshold: any = await getParameter(
        `${contractAddress}.${contractName}`,
        'proposeThreshold'
      );
      const canPropose = balance >= Number(proposeThreshold);
      return { proposeThreshold, canPropose };
    },
    isSignedIn ? signedInOptions : signedOutOptions
  );

  const { data: voteData } = useQuery(
    'vote-threshold',
    async () => {
      const contractAddress = voting?.contractAddress.split('.')[0];
      const contractName = voting?.contractAddress.split('.')[1];
      const voteThreshold: any = await getParameter(
        `${contractAddress}.${contractName}`,
        'voteThreshold'
      );
      const canVote = balance >= Number(voteThreshold);
      return { voteThreshold, canVote };
    },
    isSignedIn ? signedInOptions : signedOutOptions
  );

  return {
    isFetching,
    isIdle,
    isLoading,
    isError,
    isSignedIn,
    balance,
    proposeData,
    voteData,
  };
}
