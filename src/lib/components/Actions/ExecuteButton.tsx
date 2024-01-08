import { useCallback, useState } from 'react';
import { Button, Spinner, useToast } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';
import { useOpenContractCall } from '@micro-stacks/react';
import { contractPrincipalCV } from 'micro-stacks/clarity';
import { TxToast } from '@lib/components/Toast';
import { generatePostConditions } from '@common/functions';
import { defaultTo } from 'lodash';
import {
  contractPrincipal,
  getExplorerLink,
  tokenToNumber,
} from '@common/helpers';
import {
  useFungibleToken,
  useToken,
  useTransaction,
  useProposal,
  usePostConditions,
} from '@common/queries';
import { useConcludeProposal } from '@common/mutations/proposals';
import { FaCheck } from 'react-icons/fa';
import { MEGA_VOTING_CONTRACT } from '@lib/common/constants';
import { PostConditionMode } from 'micro-stacks/transactions';

type TExecuteButtonProps = ButtonProps & {
  proposalPrincipal: string;
  postConditions?: any;
  assetName?: string;
};

export const ExecuteButton = (props: TExecuteButtonProps) => {
  const toast = useToast();
  const { proposalPrincipal } = props;
  const [transactionId, setTransactionId] = useState('');
  const { token } = useToken();
  const voting = { contractAddress: MEGA_VOTING_CONTRACT };
  const { data: transaction } = useTransaction(transactionId);
  const [proposalContractAddress, proposalContractName] =
    contractPrincipal(proposalPrincipal);
  const { isLoading, isIdle, data } = useProposal(proposalPrincipal);
  const { data: conditions } = usePostConditions(proposalPrincipal);
  const [contractAddress, contractName] = contractPrincipal(
    voting?.contractAddress
  );
  const { openContractCall, isRequestPending } = useOpenContractCall();
  const { data: fungibleToken } = useFungibleToken(
    conditions?.postConditions?.assetAddress
  );
  const { mutate: concludeProposal } = useConcludeProposal();

  const onFinishInsert: any = async () => {
    try {
      concludeProposal({
        contractAddress: proposalPrincipal,
      });
    } catch (e: any) {
      console.error({ e });
    }
  };

  const handleExecute = useCallback(async () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { votesFor, votesAgainst } = data?.proposal;
    const fungibleTokenDecimals = defaultTo(fungibleToken?.decimals, 6);
    const totalVotes = Number(votesFor) + Number(votesAgainst);
    const convertedVotesFor = tokenToNumber(
      Number(votesFor),
      Number(token?.decimals)
    );
    const convertedVotesAgainst = tokenToNumber(
      Number(votesAgainst),
      Number(token?.decimals)
    );
    const convertedTotalVotes = tokenToNumber(
      Number(totalVotes),
      Number(token?.decimals)
    );
    const isPassing =
      convertedVotesFor > convertedVotesAgainst &&
      convertedTotalVotes >= Number(data?.quorumThreshold);

    const functionName = 'conclude';
    const functionArgs = [
      contractPrincipalCV(proposalContractAddress, proposalContractName),
    ];
    const postConditions = generatePostConditions({
      postConditions: conditions?.postConditions,
      isPassing,
      assetName: conditions?.postConditions?.assetName,
      fungibleTokenDecimals,
    });

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
  }, [conditions, fungibleToken]);

  const onFinish = async (data: any) => {
    onFinishInsert();
    setTransactionId(data.txId);
    toast({
      duration: 5000,
      position: 'bottom-right',
      isClosable: true,
      render: () => (
        <TxToast
          message="Transaction submitted"
          body={`Proposal execution has been submitted successfully`}
          url={getExplorerLink(data.txId)}
          closeAll={toast.closeAll}
        />
      ),
    });
  };

  const isPending = transaction?.tx_status === 'pending';
  const isSuccessful = transaction?.tx_status === 'success';
  const isDisabled = isRequestPending || isPending || isSuccessful;

  if (isLoading || isIdle) {
    return null;
  }

  return (
    <Button {...props} onClick={handleExecute} disabled={isDisabled}>
      {isPending ? (
        <Spinner size="xs" />
      ) : isSuccessful ? (
        <FaCheck fontSize="1rem" color="light.900" />
      ) : (
        'Execute'
      )}
    </Button>
  );
};
