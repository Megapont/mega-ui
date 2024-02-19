import { supabase } from '../supabase';

export async function updateDBProposalVotesAgainst(
  proposal: string,
  amount: any
) {
  try {
    const { data, error } = await supabase
      .from('Proposals')
      .select('votesAgainst')
      .eq('contractAddress', proposal)
      .limit(1);
    if (error) throw error;
    const votesAgainst = data[0].votesAgainst;
    const votesAgainstAmount = votesAgainst + amount;
    try {
      const { data, error } = await supabase
        .from('Proposals')
        .update({ votesAgainst: votesAgainstAmount })
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
