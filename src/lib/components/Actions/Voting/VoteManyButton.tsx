import type { ButtonProps } from '@chakra-ui/react';
import { Button, Spinner, useToast } from '@chakra-ui/react';
import { useTransaction } from '@common/queries';
import { TxToast } from '@lib/components/Toast';
import { useOpenContractCall } from '@micro-stacks/react';
import {
  contractPrincipalCV,
  falseCV,
  noneCV,
  trueCV,
} from 'micro-stacks/clarity';
import { useCallback, useState } from 'react';

import { useVoteAgainst, useVoteFor } from '@common/mutations/votes';

// utils
import { contractPrincipal, getExplorerLink } from '@common/helpers';
import { MEGA_VOTING_CONTRACT } from '@lib/common/constants';
import { PostConditionMode } from 'micro-stacks/transactions';
import { FaCheck } from 'react-icons/fa';

type TVoteManyButtonProps = ButtonProps & {
  text: string;
  proposalPrincipal: string;
  voteFor: boolean;
};

export const VoteManyButton = (props: TVoteManyButtonProps) => {
  const toast = useToast();
  const { text, proposalPrincipal, voteFor } = props;
  const [transactionId, setTransactionId] = useState('');
  const voting = { contractAddress: MEGA_VOTING_CONTRACT };
  const { data: transaction } = useTransaction(transactionId);

  const { openContractCall, isRequestPending } = useOpenContractCall();
  const [proposalContractAddress, proposalContractName] =
    contractPrincipal(proposalPrincipal);

  const { mutate: voteForMutation } = useVoteFor();
  const { mutate: voteAgainstMutation } = useVoteAgainst();

  const updateVote: any = async () => {
    try {
      if (voteFor) {
        await voteForMutation({ proposalPrincipal, amount: 1000000 });
      } else {
        await voteAgainstMutation({ proposalPrincipal, amount: 1000000 });
      }
    } catch (e: any) {
      console.error({ e });
    }
  };
  const handleVote = useCallback(async () => {
    const functionArgs = [
      voteFor ? trueCV() : falseCV(),
      contractPrincipalCV(proposalContractAddress, proposalContractName),
      noneCV(),
    ];
    const [contractAddress, contractName] = contractPrincipal(
      voting?.contractAddress
    );
    const functionName = 'vote';
    const postConditions: any = [];

    await openContractCall({
      contractAddress,
      contractName,
      functionName,
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
      postConditions,
      onFinish,
      onCancel: () => {
        console.log('Cancelled vote');
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalPrincipal]);

  // const handleVote = useCallback(async () => {
  //   const delegatorAddresses = map(delegatorData, 'delegatorAddress');
  //   const delegateVote = listCV([
  //     tupleCV({
  //       for: voteFor ? trueCV() : falseCV(),
  //       proposal: contractPrincipalCV(
  //         proposalContractAddress,
  //         proposalContractName
  //       ),
  //       delegator: noneCV(),
  //     }),
  //   ]);
  //   const delegators = getDelegators({
  //     voteFor,
  //     proposalContractAddress,
  //     proposalContractName,
  //     delegatorAddresses,
  //   });
  //   const hasDelegators = size(delegators) > 0;
  //   const functionArgs = hasDelegators
  //     ? [
  //         listCV(
  //           generateWithDelegators({
  //             voteFor,
  //             proposalContractAddress,
  //             proposalContractName,
  //             delegators,
  //           })
  //         ),
  //       ]
  //     : [delegateVote];
  //   const [contractAddress, contractName] = contractPrincipal(
  //     voting?.contractAddress
  //   );
  //   const functionName = 'vote-many';
  //   const postConditions: any = [];

  //   await openContractCall({
  //     contractAddress,
  //     contractName,
  //     functionName,
  //     functionArgs,
  //     postConditionMode: PostConditionMode.Allow,
  //     postConditions,
  //     onFinish,
  //     onCancel: () => {
  //       console.log('Cancelled vote');
  //     },
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [proposalPrincipal, delegatorData]);

  const decisionText = voteFor ? 'approve' : 'reject';
  const onFinish = async (data: any) => {
    setTransactionId(data.txId);
    updateVote();

    toast({
      duration: 5000,
      position: 'bottom-right',
      isClosable: true,
      render: () => (
        <TxToast
          message="Transaction submitted"
          body={`Your vote to ${decisionText} has been submitted`}
          url={getExplorerLink(data.txId)}
          closeAll={toast.closeAll}
        />
      ),
    });
  };

  const isPending = transaction?.tx_status === 'pending';
  const isSuccessful = transaction?.tx_status === 'success';
  const isDisabled = isRequestPending || isPending || isSuccessful;

  return (
    <Button
      {...props}
      onClick={() => {
        if (isDisabled) {
          return;
        }
        handleVote();
      }}
      disabled={isDisabled}
    >
      {isPending ? (
        <Spinner size="xs" />
      ) : isSuccessful ? (
        <FaCheck fontSize="1rem" color="light.900" />
      ) : (
        text
      )}
    </Button>
  );
};
