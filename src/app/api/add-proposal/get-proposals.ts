import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
