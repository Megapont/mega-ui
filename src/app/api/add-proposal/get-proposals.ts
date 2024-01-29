import { supabase } from '../supabase';

export async function getDBProposal(proposal: string) {
  try {
    const { data: Proposal, error } = await supabase
      .from('Proposals')
      .select('*')
      .match({
        contractAddress: proposal,
      });

    if (error) throw error;
    return Proposal;
  } catch (e: any) {
    console.error({ e });
  }
}
