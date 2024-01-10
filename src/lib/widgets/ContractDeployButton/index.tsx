import {
  Button,
  ButtonProps,
  Spinner,
  Text,
  ButtonGroup,
  CloseButton,
  Stack,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { stacksNetwork } from '@lib/common/constants';
import { usePolling } from '@lib/common/hooks';
import { useAddProposal } from '@lib/common/mutations/proposals';
import { useVotingExtension } from '@lib/common/queries';

// Stacks
import { useAccount, useOpenContractDeploy } from '@micro-stacks/react';
import { useStore } from '@store/CodeStore';
import { fetchTransaction } from 'micro-stacks/api';
import { useCallback, useState } from 'react';
import { Notification } from '@lib/components/Notification';

type ContractDeployType = {
  title: string;
  description: string;
  contractName: string;
  onFinish?: (data: any) => void;
  setState: () => void;
};

export const ContractDeployButton = (
  props: ButtonProps & ContractDeployType
) => {
  const { code } = useStore();
  const { openContractDeploy, isRequestPending } = useOpenContractDeploy();
  const { contractName, title, description, setState } = props;
  const { mutate: createProposal } = useAddProposal();
  const { data: votingData } = useVotingExtension();
  const { stxAddress } = useAccount();
  const network = new stacksNetwork();
  const toast = useToast();

  const [transaction, setTransaction] = useState({
    txId: '',
    isPending: false,
  });

  usePolling(() => {
    fetchTransactionData(transaction.txId);
  }, transaction.isPending);

  async function fetchTransactionData(transactionId: string) {
    try {
      const transaction = await fetchTransaction({
        url: network.getCoreApiUrl(),
        txid: transactionId,
        event_offset: 0,
        event_limit: 0,
      });
      if (transaction?.tx_status === 'success') {
        setTransaction({
          txId: '',
          isPending: false,
        });
        onComplete(transaction);
        setState();
      } else if (transaction?.tx_status === 'abort_by_response') {
        setTransaction({
          txId: '',
          isPending: false,
        });
        onFailed(transaction);
      }
    } catch (e: any) {
      console.error({ e });
    }
  }

  const onComplete = useCallback(
    (data: any) => {
      toast({
        duration: 3500,
        isClosable: true,
        position: 'top-right',
        render: () => (
          <Notification>
            <Stack direction="row" p="4" spacing="3">
              <Stack spacing="2.5">
                <Stack spacing="1">
                  <Text fontSize="md" color="light.900" fontWeight="medium">
                    Transaction minted!
                  </Text>
                  <Text fontSize="sm" color="gray.900">
                    Your transaction was successfully executed.
                  </Text>
                </Stack>
                <ButtonGroup variant="link" size="sm" spacing="2">
                  <Button
                    color="secondary.900"
                    as="a"
                    target="_blank"
                    href={
                      process.env.NODE_ENV !== 'production'
                        ? `http://localhost:8000/txid/${data.tx_id}?chain=testnet`
                        : `https://explorer.stacks.co/txid/${data.tx_id}?chain=mainnet`
                    }
                  >
                    View transaction
                  </Button>
                </ButtonGroup>
              </Stack>
              <CloseButton
                aria-label="close"
                transform="translateY(-6px)"
                color="white"
                onClick={() => toast.closeAll()}
              />
            </Stack>
          </Notification>
        ),
      });
    },
    [toast]
  );
  const onFailed = useCallback(
    (data: any) => {
      toast({
        duration: 3500,
        isClosable: true,
        position: 'top-right',
        render: () => (
          <Notification>
            <Stack direction="row" p="4" spacing="3">
              <Stack spacing="2.5">
                <Stack spacing="1">
                  <Text fontSize="md" color="light.900" fontWeight="medium">
                    Transaction Failed!
                  </Text>
                  <Text fontSize="sm" color="gray.900">
                    Your transaction failed to execute.
                  </Text>
                </Stack>
                <ButtonGroup variant="link" size="sm" spacing="2">
                  <Button
                    color="secondary.900"
                    as="a"
                    target="_blank"
                    href={
                      process.env.NODE_ENV !== 'production'
                        ? `http://localhost:8000/txid/${data.tx_id}?chain=testnet`
                        : `https://explorer.stacks.co/txid/${data.tx_id}?chain=mainnet`
                    }
                  >
                    View transaction
                  </Button>
                </ButtonGroup>
              </Stack>
              <CloseButton
                aria-label="close"
                transform="translateY(-6px)"
                color="white"
                onClick={() => toast.closeAll()}
              />
            </Stack>
          </Notification>
        ),
      });
    },
    [toast]
  );

  const onFinishInsert: any = async (data: any) => {
    setTransaction({ txId: data.txId, isPending: true });
    const executionDelay = Number(votingData?.executionDelay);

    try {
      createProposal({
        contractAddress: `${stxAddress}.${contractName}` || '',
        proposer: stxAddress || '',
        type: 'proposal',
        transactionId: `0x${data.txId}`,
        title,
        description,
        executionDelay,
      });
      //closeOnDeploy();
    } catch (e: any) {
      console.log(e);
      console.error({ e });
    }
  };

  const handleContractDeploy = async () => {
    console.log('contractName', contractName);
    await openContractDeploy({
      contractName,
      codeBody: code,
      onFinish: onFinishInsert,
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
      onClick={() => handleContractDeploy()}
    >
      {isRequestPending || transaction.isPending ? (
        <HStack gap={2}>
          <Spinner size={'sm'} />
          <Text>deploying</Text>
        </HStack>
      ) : (
        'deploy contract'
      )}
    </Button>
  );
};
