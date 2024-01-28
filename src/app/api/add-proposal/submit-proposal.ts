import { supabase } from '../supabase';

export async function submitProposal(proposal: {
  contractAddress: string;
  startBlockHeight: number;
  endBlockHeight: number;
  threadID: string;
  submitted: boolean;
}) {
  try {
    const { data, error } = await supabase
      .from('Proposals')
      .update({
        startBlockHeight: proposal.startBlockHeight,
        endBlockHeight: proposal.endBlockHeight,
        threadID: proposal.threadID,
        submitted: proposal.submitted,
      })
      .match({
        contractAddress: proposal.contractAddress,
      })
      .limit(1);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.log(e);
    console.error({ e });
  }
}
