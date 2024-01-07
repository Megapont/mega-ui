import { Button, ButtonProps, Spinner } from '@chakra-ui/react';
import { MEGA_SUBMISSION_CONTRACT } from '@lib/common/constants';
import { useBlocks } from '@lib/common/hooks';

// Stacks
import { useAccount, useOpenContractCall } from '@micro-stacks/react';
import { contractPrincipalCV, uintCV } from 'micro-stacks/clarity';
import { PostConditionMode } from 'micro-stacks/transactions';

type ContractDeployType = {
  label: JSX.Element;
  proposalAddress: string;
  onFinish?: (data: any) => void;
};

export const ProposeButton = (props: ButtonProps & ContractDeployType) => {
  const { stxAddress } = useAccount();
  const { openContractCall, isRequestPending } = useOpenContractCall();
  const { proposalAddress, onFinish, label } = props;

  const submission = {
    contractAddress: MEGA_SUBMISSION_CONTRACT,
  };
  const { currentBlockHeight } = useBlocks();
  const startHeight = currentBlockHeight + 30;

  const contractAddress = submission?.contractAddress?.split('.')[0];
  const contractName = submission?.contractAddress?.split('.')[1];

  const functionName = 'propose';
  const functionArgs = [
    contractPrincipalCV(stxAddress!, proposalAddress),
    uintCV(startHeight),
  ];

  const handleProposal = async () => {
    console.log(
      proposalAddress,
      contractAddress,
      contractName,
      functionName,
      functionArgs
    );
    await openContractCall({
      contractAddress,
      contractName,
      functionName,
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
      onFinish,
      onCancel: () => {
        console.log('popup closed!');
      },
    });
  };

  return (
    <Button
      {...props}
      colorScheme="base"
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
      onClick={() => handleProposal()}
    >
      {isRequestPending ? <Spinner /> : label}
    </Button>
  );
};
