import { useCallback, useState } from 'react';
import type { ButtonProps } from '@chakra-ui/react';
import { Button, Spinner, useToast } from '@chakra-ui/react';
import { useOpenContractCall } from '@micro-stacks/react';
import { uintCV, contractPrincipalCV } from 'micro-stacks/clarity';
import { TxToast } from '@lib/components/Toast';
import { useBlocks } from '@common/hooks';
import { useSubmissionExtension, useTransaction } from '@common/queries';

// Mutations
import { useSubmitProposal } from '@common/mutations/proposals';

// utils
import { contractPrincipal, getExplorerLink } from '@common/helpers';
import { FaCheck } from 'react-icons/fa';
import { MEGA_SUBMISSION_CONTRACT } from '@lib/common/constants';

type TProposeButtonProps = ButtonProps & {
  text: string;
  proposalPrincipal: string;
  notDeployer: boolean;
};

export const ProposeButton = (props: TProposeButtonProps) => {
  const toast = useToast();
  const { text, notDeployer, proposalPrincipal } = props;
  const [transactionId, setTransactionId] = useState('');
  const { currentBlockHeight } = useBlocks();
  const submission = { contractAddress: MEGA_SUBMISSION_CONTRACT };
  const { data: submissionData } = useSubmissionExtension();
  const { data: transaction } = useTransaction(transactionId);
  const { openContractCall, isRequestPending } = useOpenContractCall();
  const { mutate: submitProposal } = useSubmitProposal();
  const startBlockHeight =
    currentBlockHeight + Number(submissionData?.minimumProposalStartDelay) + 25;
  const endBlockHeight =
    startBlockHeight + Number(submissionData?.proposalDuration);

  const onFinishUpdate = async () => {
    try {
      submitProposal({
        contractAddress: proposalPrincipal,
        startBlockHeight,
        endBlockHeight,
        submitted: true,
      });
    } catch (e: any) {
      console.error({ e });
    }
  };

  const handleProposal = useCallback(async () => {
    if (isDisabled) return;
    const [contractAddress, contractName] = contractPrincipal(
      submission?.contractAddress
    );
    const [proposalContractAddress, proposalContractName] =
      contractPrincipal(proposalPrincipal);

    const functionArgs = [
      contractPrincipalCV(proposalContractAddress, proposalContractName),
      uintCV(startBlockHeight),
    ];
    const functionName = 'propose';
    const postConditions: any = [];

    await openContractCall({
      contractAddress,
      contractName,
      functionName,
      functionArgs,
      postConditions,
      onFinish,
      onCancel: () => {
        console.log('Cancelled proposal');
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    proposalPrincipal,
    submission,
    currentBlockHeight,
    startBlockHeight,
    endBlockHeight,
  ]);

  const onFinish = async (data: any) => {
    onFinishUpdate();
    setTransactionId(data.txId);
    toast({
      duration: 5000,
      position: 'bottom-right',
      isClosable: true,
      render: () => (
        <TxToast
          message="Transaction submitted"
          body={`Your proposal has been submitted`}
          url={getExplorerLink(data.txId)}
          closeAll={toast.closeAll}
        />
      ),
    });
  };

  const isPending = transaction?.tx_status === 'pending';
  const isSuccessful = transaction?.tx_status === 'success';
  const isDisabled =
    isRequestPending || isPending || isSuccessful || notDeployer;

  return (
    <Button {...props} onClick={handleProposal} disabled={isDisabled}>
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
