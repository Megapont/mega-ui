import { supabase } from '@utils/supabase';
import { useMutation, useQueryClient } from 'react-query';

type Proposal = {
  contractAddress: string;
  proposer: string;
  type: string;
  transactionId: string;
  title: string;
  description: string;
  postConditions?: any;
  executionDelay: number;
};

export async function createProposalContract(proposal: Proposal) {
  try {
    const { data, error } = await supabase
      .from('Proposals')
      .insert([{ ...proposal }]);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useAddProposal = () => {
  const queryClient = useQueryClient();
  return useMutation(createProposalContract, {
    onSuccess: () => {
      queryClient.invalidateQueries('contracts');
    },
  });
};

export async function updateSubmittedProposal(proposal: {
  contractAddress: string;
  startBlockHeight: number;
  endBlockHeight: number;
  submitted: boolean;
}) {
  try {
    console.log('updating proposal');
    const { data, error } = await supabase
      .from('Proposals')
      .update({
        startBlockHeight: proposal.startBlockHeight,
        endBlockHeight: proposal.endBlockHeight,
        submitted: proposal.submitted,
      })
      .match({
        contractAddress: proposal.contractAddress,
      });
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.log(e);
    console.error({ e });
  }
}

export const useConcludeProposal = () => {
  const queryClient = useQueryClient();
  return useMutation(concludeProposal, {
    onSuccess: () => {
      queryClient.invalidateQueries('contracts');
    },
  });
};

export async function concludeProposal(proposal: { contractAddress: string }) {
  try {
    const { data, error } = await supabase
      .from('Proposals')
      .update({
        concluded: true,
      })
      .match({
        contractAddress: proposal.contractAddress,
      });
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useSubmitProposal = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSubmittedProposal, {
    onSuccess: () => {
      queryClient.invalidateQueries('contracts');
    },
  });
};

export async function updateDisabledProposal(proposal: {
  contractAddress: string;
  disabled: boolean;
}) {
  try {
    const { data, error } = await supabase
      .from('Proposals')
      .update({ disabled: proposal.disabled })
      .match({
        contractAddress: proposal.contractAddress,
      });
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useDisableProposal = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDisabledProposal, {
    onSuccess: (data: any) => {
      const [disabledContract] = data;
      queryClient.setQueryData('contracts', (contracts: any) => {
        const filteredContracts = contracts.filter(
          (contract: any) => contract.id !== disabledContract.id
        );
        return [...filteredContracts];
      });
    },
  });
};
