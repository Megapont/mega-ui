import { supabase } from '@utils/supabase';
import { useMutation } from 'react-query';

export async function voteFor({ proposalPrincipal, amount }: any) {
  try {
    const { data, error } = await supabase
      .from('Proposals')
      .select('votesFor')
      .eq('contractAddress', proposalPrincipal)
      .limit(1);
    if (error) throw error;
    const votesFor = data[0].votesFor;
    const votesForAmount = votesFor + amount;
    try {
      const { data, error } = await supabase
        .from('Proposals')
        .update({ votesFor: votesForAmount })
        .match({
          contractAddress: proposalPrincipal,
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

export const useVoteFor = () => {
  return useMutation(voteFor, {
    onSuccess: () => {
      console.log('Successfully voted for');
    },
  });
};

export async function voteAgainst({ proposalPrincipal, amount }: any) {
  try {
    const { data, error } = await supabase
      .from('Proposals')
      .select('votesAgainst')
      .eq('contractAddress', proposalPrincipal)
      .limit(1);
    if (error) throw error;
    const votesAgainst = data[0].votesAgainst;
    const votesAgainstAmount = votesAgainst + amount;
    try {
      const { data, error } = await supabase
        .from('Proposals')
        .update({ votesAgainst: votesAgainstAmount })
        .match({
          contractAddress: proposalPrincipal,
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

export const useVoteAgainst = () => {
  return useMutation(voteAgainst, {
    onSuccess: () => {
      console.log('Successfully voted against');
    },
  });
};
