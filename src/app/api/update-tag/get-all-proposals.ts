import { supabase } from '../supabase';

export async function getAllDBProposal() {
  try {
    const { data: Proposals, error } = await supabase
      .from('Proposals')
      .select('*');

    if (error) throw error;
    return Proposals;
  } catch (e: any) {
    console.error({ e });
  }
}
