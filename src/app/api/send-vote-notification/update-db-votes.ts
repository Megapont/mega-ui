import { supabase } from '../supabase';

export async function updateDBProposalVotesFor(proposal: string, amount: any) {
  try {
    const { data, error } = await supabase
      .from('Proposals')
      .select('votesFor')
      .eq('contractAddress', proposal)
      .limit(1);
    if (error) throw error;
    const votesFor = data[0].votesFor;
    const votesForAmount = votesFor + amount;
    try {
      const { data, error } = await supabase
        .from('Proposals')
        .update({ votesFor: votesForAmount })
        .match({
          contractAddress: proposal,
        });
      if (error) throw error;
      return data;
    } catch (e: any) {
      console.error({ e });
    }
  } catch (e: any) {
    console.error({ e });
  }
}
