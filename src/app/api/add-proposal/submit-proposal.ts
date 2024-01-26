import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export async function submitProposal(proposal: {
  contractAddress: string;
  startBlockHeight: number;
  endBlockHeight: number;
  submitted: boolean;
}) {
  try {
    const { data, error } = await supabase
      .from('Proposals')
      .update({
        startBlockHeight: proposal.startBlockHeight,
        endBlockHeight: proposal.endBlockHeight,
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
