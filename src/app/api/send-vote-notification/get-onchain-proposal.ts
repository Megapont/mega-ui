import { MEGA_VOTING_CONTRACT } from '@lib/common/constants';
import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { contractPrincipalCV } from 'micro-stacks/clarity';

export async function getOnChainProposal(proposal: string) {
  try {
    const proposal_data: any = await fetchReadOnlyFunction({
      contractAddress: MEGA_VOTING_CONTRACT.split('.')[0],
      contractName: MEGA_VOTING_CONTRACT.split('.')[1],
      senderAddress: MEGA_VOTING_CONTRACT.split('.')[0],
      functionArgs: [
        contractPrincipalCV(proposal.split('.')[0], proposal.split('.')[1]),
      ],
      functionName: 'get-proposal-data',
    });

    return proposal_data;
  } catch (e: any) {
    console.error({ e });
  }
}
