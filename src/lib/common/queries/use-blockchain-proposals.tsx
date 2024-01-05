// Hook (use-proposals.tsx)
import { useQuery, useQueries } from 'react-query';
import { useExtension } from '@common/queries';
import { getProposal, getProposalCount, getProposalAddress } from '@common/api';

export function useBlockchainProposals() {
  const { extension: voting } = useExtension('Voting');
  const { data } = useQuery(
    ['proposals-count', 'count'],
    () => getProposalCount(voting?.contractAddress),
    {
      enabled: !!voting?.contractAddress,
    }
  );
  const proposalAddresses: any = [];

  for (let proposalCount = Number(data); proposalCount > 0; proposalCount--) {
    proposalAddresses.push({
      queryKey: ['proposal-address', proposalCount?.toString()],
      queryFn: async () => {
        const data = await getProposalAddress(
          voting?.contractAddress,
          proposalCount?.toString()
        );
        return data;
      },
      enabled: !!voting?.contractAddress,
      refetchOnWindowFocus: false,
    });
  }
  const results = useQueries(proposalAddresses);
  const addresses = results.map((result: any) => {
    return {
      queryKey: ['proposal', result?.data],
      queryFn: async () => {
        const data = await getProposal(voting?.contractAddress, result?.data);
        return data;
      },
      enabled: !!results && !!voting?.contractAddress && !!result?.data,
      refetchOnWindowFocus: false,
    };
  });

  const proposals = useQueries(addresses);

  return { proposals, hasMore: proposals.length < Number(data) };
}
