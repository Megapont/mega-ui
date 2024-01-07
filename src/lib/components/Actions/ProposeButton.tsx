import { useEffect } from 'react';
import { supabase } from '@utils/supabase';

// Components
import { ContractCallButton } from '@widgets/ContractCallButton';

// Web3
import {
  contractPrincipalCV,
  standardPrincipalCV,
  uintCV,
} from 'micro-stacks/clarity';

// Hooks
import { useBlocks } from '@common/hooks';

// Queries
import { MEGA_SUBMISSION_CONTRACT } from '@lib/common/constants';
import { useAccount } from '@micro-stacks/react';

export const ProposeButton = ({ proposalContractAddress }: any) => {
  console.log({ proposalContractAddress });
  const { stxAddress } = useAccount();
  const { currentBlockHeight } = useBlocks();
  // const governance = {
  //   contractAddress: MEGA_DAO_CONTRACT,
  // };
  const submission = {
    contractAddress: MEGA_SUBMISSION_CONTRACT,
  };

  const contractAddress = submission?.contractAddress?.split('.')[0];
  const contractName = submission?.contractAddress?.split('.')[1];

  // const governanceContractAddress = governance?.contractAddress?.split('.')[0];
  // const governanceContractName = governance?.contractAddress?.split('.')[1];

  useEffect(() => {
    console.log('rendered');
  }, [proposalContractAddress]);

  const onFinishUpdate = async (contractAddress: string) => {
    try {
      const { data, error } = await supabase
        .from('Proposals')
        .update({ submitted: true })
        .match({
          contractAddress: contractAddress,
        });
      if (error) throw error;
      console.log({ data });
    } catch (e: any) {
      console.error({ e });
    }
  };

  const startHeight = currentBlockHeight + 30; // TODO: 50 needs to be dynamic startBlockHeight min

  const functionName = 'propose';
  const functionArgs = proposalContractAddress && [
    contractPrincipalCV(stxAddress!, proposalContractAddress),
    uintCV(startHeight),
    standardPrincipalCV(stxAddress!),
  ];
  const postConditions: any = [];

  const contractData = {
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    postConditions,
  };

  return (
    <ContractCallButton
      title="Propose"
      color="white"
      bg="secondary.900"
      size="md"
      onContractCall={() => onFinishUpdate(proposalContractAddress)}
      {...contractData}
    />
  );
};
