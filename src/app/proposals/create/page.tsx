'use client';

import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Container,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

// Web3
import { useAccount, useNetwork } from '@micro-stacks/react';
import { fetchTransaction } from 'micro-stacks/api';

import { useBlocks, usePolling, useStep } from '@common/hooks';
import { Notification } from '@lib/components/Notification';
import { VerticalStep } from '@lib/components/VerticalStep';
import { useForm } from 'react-hook-form';

//  Animation
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

// Utils
import { truncate } from '@common/helpers';
import Avatar from 'boring-avatars';
import {
  FaAngleLeft,
  FaAngleRight,
  FaCheckCircle,
  FaFileUpload,
  FaPaperclip,
} from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

// Store
import { Editor, loader, type Monaco } from '@monaco-editor/react';

import { useSubmitProposal } from '@lib/common/mutations/proposals';
import {
  useGenerateName,
  useSubmissionExtension,
  useTokenBalance,
} from '@lib/common/queries';
import { EmptyState } from '@lib/components/EmptyState';
import { useStore as useCodeStore } from '@lib/store/CodeStore';
import { ContractDeployButton } from '@lib/widgets/ContractDeployButton';
import { ProposeButton } from '@lib/widgets/ProposeButton';
import { useRouter } from 'next/navigation';

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

// Function to define Clarity language
const defineClarityLanguage = (monaco: Monaco) => {
  monaco.languages.register({ id: 'clarity' });

  monaco.languages.setMonarchTokensProvider('clarity', {
    tokenizer: {
      root: [
        // Comments
        [/(;;.*$)/, 'comment'],

        // Strings
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

        // Keywords
        [
          /\b(contract-call?|impl-trait|define-data-var|define-public|define-private|define-read-only|define-constant|begin|let|if|map-set|map-get\?|and|or|not|is-eq|unwrap-panic|unwrap-err-panic|unwrap-err!|unwrap!|asserts!|try!|ok|err)\b/,
          'keyword',
        ],

        // Numbers - Clarity supports both signed and unsigned integers
        [/\bu?[0-9]+/, 'number'],

        // Brackets and Parentheses
        [/[{}()[\]]/, '@brackets'],

        // Operators
        [/[=<>!+\-*/%]/, 'operator'],
      ],

      string: [
        [/[^"]+/, 'string'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],
    },
  });
};

const CreateProposal = () => {
  const router = useRouter();
  const { network } = useNetwork();

  const { register, getValues, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { title, description } = getValues();
  const [currentStep, { setStep }] = useStep({
    maxStep: 4,
    initialStep: 0,
  });

  const { data: contractName } = useGenerateName();
  const toast = useToast();

  const { mutate: submitProposal } = useSubmitProposal();
  const [transaction, setTransaction] = useState({
    txId: '',
    isPending: false,
  });
  const {
    balance,
    isLoading: tokenBalanceLoading,
    isIdle: tokenBalanceIdle,
  } = useTokenBalance();
  const { currentBlockHeight } = useBlocks();

  const { stxAddress } = useAccount();

  const { data: submissionData, isLoading, isIdle } = useSubmissionExtension();

  const [state, setState] = useState({ isProposed: false });

  const { isProposed } = state;

  const onSubmit = (data: any) => {
    console.log(data);
    setStep(currentStep + 1);
  };
  const isMobile = useBreakpointValue({ base: true, md: false });

  usePolling(() => {
    fetchTransactionData(transaction.txId);
  }, transaction.isPending);

  useEffect(() => {
    loader.init().then((monaco) => {
      defineClarityLanguage(monaco);
    });
  }, []);
  const startBlockHeight =
    currentBlockHeight + Number(submissionData?.minimumProposalStartDelay) + 25;
  const endBlockHeight =
    startBlockHeight + Number(submissionData?.proposalDuration);
  const canPropose =
    balance * Math.pow(10, 2) >= Number(submissionData?.proposeThreshold);

  const onFinishUpdate = async (data: any) => {
    setTransaction({ txId: data.txId, isPending: true });
    try {
      submitProposal({
        contractAddress: `${stxAddress}.mdp-${contractName}`,
        startBlockHeight,
        endBlockHeight,
        submitted: true,
      });
    } catch (e: any) {
      console.error({ e });
    }
  };

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
        setStep(currentStep + 1);
        setState({ isProposed: true });
      }
    } catch (e: any) {
      console.error({ e });
    }
  }
  const ProposalDetails = () => {
    console.log('rendered');
    return (
      <>
        <Stack
          spacing="0"
          mb="5"
          direction={{ base: 'column', md: 'column' }}
          justify="space-between"
          color="white"
        >
          <Text fontSize="2xl" fontWeight="semibold" color="light.900">
            Proposal Title
          </Text>
          <Stack direction="column">
            <Text fontSize="sm" fontWeight="regular" color="gray.900">
              Title for the new proposal
            </Text>
          </Stack>
        </Stack>
        <Stack color="light.900" spacing="6" direction="column" maxW="xl">
          <FormControl>
            <Input
              required
              color="light.900"
              fontSize="xl"
              py="1"
              px="2"
              pl="2"
              bg="base.900"
              border="none"
              resize="none"
              autoComplete="off"
              placeholder="Proposal for..."
              {...register('title')}
              _focus={{
                border: 'none',
              }}
            />
          </FormControl>
        </Stack>
        <Stack
          spacing="0"
          mt="10"
          mb="5"
          direction={{ base: 'column', md: 'column' }}
          justify="space-between"
          color="white"
        >
          <Text fontSize="2xl" fontWeight="semibold" color="light.900">
            Proposal details
          </Text>
          <Stack direction="column">
            <Text fontSize="sm" fontWeight="regular" color="gray.900">
              Provide some additional context for the proposal.
            </Text>
          </Stack>
        </Stack>
        <Stack
          color="light.900"
          spacing="6"
          direction="column"
          maxW="xl"
          mb={'5'}
        >
          <FormControl>
            <Textarea
              color="light.900"
              fontSize="xl"
              required
              py="1"
              px="2"
              pl="2"
              bg="base.900"
              border="none"
              rows={5}
              resize="none"
              autoComplete="off"
              placeholder="This proposal once passed will..."
              {...register('description')}
              _focus={{
                border: 'none',
              }}
            />
          </FormControl>
        </Stack>
      </>
    );
  };
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

  // const handleGoBack = () => {
  //   setTransaction({ txId: '', data: {} });
  //   router.back();
  // };

  useEffect(() => {
    if (transaction.txId) {
      console.log({ transaction });
    }
  }, [transaction]);

  if (isLoading || isIdle || tokenBalanceLoading || tokenBalanceIdle) {
    return (
      <Container maxW="5xl">
        <Stack spacing={{ base: '6', lg: '4' }} mt="5">
          <Container>
            <motion.div
              variants={FADE_IN_VARIANTS}
              initial={FADE_IN_VARIANTS.hidden}
              animate={FADE_IN_VARIANTS.enter}
              exit={FADE_IN_VARIANTS.exit}
              transition={{ duration: 0.75, type: 'linear' }}
            >
              <Stack
                spacing="6"
                display={isMobile ? 'block' : 'flex'}
                direction={{ base: 'column', md: 'row' }}
                justify="center"
                align="center"
                color="white"
              >
                <EmptyState heading="loading..." />
              </Stack>
            </motion.div>
          </Container>
        </Stack>
      </Container>
    );
  }

  if (!canPropose) {
    router.push('/proposals');
    return null;
  }

  const createProposalSteps = [
    {
      title: 'Smart Contract Code',
      description:
        currentStep <= 0 ? (
          <></>
        ) : (
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.5, type: 'linear' }}
          >
            <HStack>
              <FiSend fontSize="0.9rem" />
              <Text fontSize="md" fontWeight="medium" color="light.900">
                Ready to deploy
              </Text>
            </HStack>
          </motion.div>
        ),
    },
    {
      title: 'Provide some context for the proposal',
      description:
        currentStep <= 1 ? (
          <></>
        ) : (
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.5, type: 'linear' }}
          >
            <HStack>
              <FaPaperclip fontSize="0.9rem" />
              <Text fontSize="md" fontWeight="medium" color="light.900">
                Details submitted
              </Text>
            </HStack>
          </motion.div>
        ),
    },

    {
      title: 'Review & Deploy ',
      description:
        currentStep <= 2 ? (
          <></>
        ) : (
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.5, type: 'linear' }}
          >
            <HStack>
              <FaFileUpload fontSize="0.9rem" />
              <Text fontSize="md" fontWeight="medium" color="light.900">
                Proposal contract deployed
              </Text>
            </HStack>
          </motion.div>
        ),
    },
    {
      title: 'Proposal submission',
      description:
        currentStep <= 3 ? (
          <></>
        ) : (
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.5, type: 'linear' }}
          >
            <HStack>
              <FaCheckCircle fontSize="0.9rem" />
              <Text fontSize="md" fontWeight="medium" color="light.900">
                Proposal contract submitted
              </Text>
            </HStack>
          </motion.div>
        ),
    },
  ];

  const SmartContractCode = () => {
    const { code, setCode } = useCodeStore();
    return (
      <>
        <Stack
          spacing="0"
          mb="2"
          direction={{ base: 'column', md: 'column' }}
          justify="space-between"
          color="white"
          h={'80%'}
        >
          <Text fontSize="2xl" fontWeight="semibold" color="light.900">
            Proposal Code
          </Text>
          <Stack direction="column">
            <Text fontSize="sm" fontWeight="regular" color="gray.900">
              Each proposal in mega DAO is a smart contract. You can write and
              deploy your clarity contract here
            </Text>
          </Stack>
        </Stack>
        <Stack color="light.900" spacing="5" direction="column" maxW="4xl">
          <Stack color="light.900" direction="column" my="2">
            <Editor
              height="50vh"
              theme="vs-dark"
              defaultLanguage="clarity" // Set to use the custom Clarity language
              value={code}
              onChange={(value) => setCode(value as string)}
            />
          </Stack>
        </Stack>
      </>
    );
  };

  const ProposalReview = () => {
    return (
      <Stack
        maxW="md"
        spacing="8"
        mx="auto"
        direction={{ base: 'column', md: 'column' }}
        justify="space-between"
        align="center"
        color="white"
      >
        <Stack mb="5" align="center" spacing="3">
          <Avatar
            size={50}
            name="MDP Transfer STX"
            variant="bauhaus"
            colors={['#50DDC3', '#624AF2', '#EB00FF', '#7301FA', '#25C2A0']}
          />
          <Text fontSize="2xl" fontWeight="semibold" color="light.900">
            {`mdp-${contractName}`}
          </Text>
        </Stack>
        <Stack
          display="contents"
          justify="space-between"
          align="center"
          spacing="5"
        >
          <Stack w="100%" spacing="1">
            <Text
              color="gray.900"
              fontSize="md"
              mb={{ base: '10px', md: '0px' }}
            >
              Title
            </Text>
            <Text fontSize="md" fontWeight="regular" color="light.900">
              {title
                ? title.length > 50
                  ? truncate(title, 75, 0)
                  : title
                : ''}
            </Text>
          </Stack>

          <Stack w="100%" spacing="1">
            <Text
              color="gray.900"
              fontSize="md"
              mb={{ base: '10px', md: '0px' }}
            >
              Details
            </Text>
            <Text fontSize="md" fontWeight="regular" color="light.900">
              {description
                ? description.length > 75
                  ? truncate(description, 75, 0)
                  : description
                : ''}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  const ProposalSubmission = () => {
    return (
      <Stack
        maxW="md"
        spacing="8"
        mx="auto"
        direction={{ base: 'column', md: 'column' }}
        justify="space-between"
        align="center"
        color="white"
      >
        <Stack mb="5" align="center" spacing="3">
          <Avatar
            size={50}
            name="Proposals"
            variant="bauhaus"
            colors={['#50DDC3', '#624AF2', '#EB00FF', '#7301FA', '#25C2A0']}
          />
          <Text fontSize="2xl" fontWeight="semibold" color="light.900">
            {`mdp-${contractName}`}
          </Text>
          <HStack justify="center" my="3">
            <Badge
              variant="subtle"
              bg="base.800"
              color="secondary.900"
              px="3"
              py="2"
            >
              <HStack spacing="2">
                <Icon color="secondary.900" as={FaCheckCircle} />
                <Text>Deployed</Text>
              </HStack>
            </Badge>
          </HStack>
        </Stack>
        <Stack
          display="contents"
          justify="space-between"
          align="center"
          spacing="5"
        >
          <Stack w="100%" spacing="1">
            <Text
              color="gray.900"
              fontSize="md"
              mb={{ base: '10px', md: '0px' }}
            >
              Details
            </Text>
            <Text fontSize="md" fontWeight="regular" color="light.900">
              {description
                ? description.length > 75
                  ? truncate(description, 75, 0)
                  : description
                : ''}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  const ProposalSubmitted = () => {
    return (
      <Stack
        maxW="md"
        spacing="8"
        mx="auto"
        direction={{ base: 'column', md: 'column' }}
        justify="space-between"
        align="center"
        color="white"
      >
        <Stack mb="5" align="center" spacing="3">
          <Avatar
            size={50}
            name="Proposals"
            variant="bauhaus"
            colors={['#50DDC3', '#624AF2', '#EB00FF', '#7301FA', '#25C2A0']}
          />
          <Text fontSize="2xl" fontWeight="semibold" color="light.900">
            {`mdp-${contractName}`}
          </Text>
          <HStack justify="center" my="3">
            <Badge
              variant="subtle"
              bg="base.800"
              color="secondary.900"
              px="3"
              py="2"
            >
              <HStack spacing="2">
                <Icon color="secondary.900" as={FaCheckCircle} />
                <Text>Submitted</Text>
              </HStack>
            </Badge>
          </HStack>
        </Stack>
        <Stack
          display="contents"
          justify="space-between"
          align="center"
          spacing="5"
        >
          <Stack w="100%" spacing="1">
            <Text
              color="gray.900"
              fontSize="md"
              mb={{ base: '10px', md: '0px' }}
            >
              Details
            </Text>
            <Text fontSize="md" fontWeight="regular" color="light.900">
              {description
                ? description.length > 75
                  ? truncate(description, 75, 0)
                  : description
                : ''}
            </Text>
          </Stack>
          <Stack w="100%" spacing="1">
            <Button
              onClick={() => router.push('/proposals')}
              color={'white'}
              bg="secondary.900"
              colorScheme="base"
              fontSize="md"
              mb={{ base: '10px', md: '0px' }}
            >
              Check out all the proposals
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  const ViewStep = () => {
    switch (currentStep) {
      case 0:
        return <SmartContractCode />;
      case 1:
        return <ProposalDetails />;
      case 2:
        return <ProposalReview />;
      case 3:
        return <ProposalSubmission />;
      case 4:
        return <ProposalSubmitted />;

      default:
        return <></>;
    }
  };

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.75, type: 'linear' }}
    >
      <Grid
        h="95vh"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
      >
        <GridItem
          rowSpan={2}
          colSpan={2}
          bg="base.900"
          borderRight="1px solid"
          borderColor="base.800"
          px={{ base: '20', md: '20' }}
          py={{ base: '10', md: '10' }}
        >
          <Box as="section">
            <VStack
              align="left"
              spacing="5"
              mb="3"
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              color="white"
            >
              <Stack spacing="0" my="5">
                <Text fontSize="2xl" fontWeight="semibold" color="light.900">
                  New Proposal
                </Text>
                <Text fontSize="sm" fontWeight="regular" color="gray.900">
                  Complete the following steps to deploy a proposal smart
                  contract
                </Text>
              </Stack>
              {createProposalSteps.map((step, id) => (
                <VerticalStep
                  key={id}
                  cursor="pointer"
                  title={step.title}
                  description={step.description}
                  isActive={currentStep === id}
                  isCompleted={currentStep > id}
                  isLastStep={createProposalSteps.length === id + 1}
                />
              ))}
            </VStack>
          </Box>
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={4}
          bg="base.900"
          px={{ base: '15', md: '20' }}
          py={{ base: '15', md: '20' }}
        >
          <Container>
            {isProposed && (
              <Confetti
                height={1200}
                width={1280}
                recycle={false}
                numberOfPieces={250}
                gravity={0.15}
                colors={['#50DDC3', '#624AF2', '#EB00FF', '#7301FA', '#25C2A0']}
              />
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <ViewStep />

              <HStack
                justify="end"
                position={'fixed'}
                bottom={'10'}
                right={'20'}
              >
                {currentStep > 0 && currentStep < 3 && (
                  <Button
                    color="white"
                    variant="outline"
                    bg={'transparent'}
                    w={'15vw'}
                    leftIcon={<FaAngleLeft />}
                    _hover={{ opacity: 0.9 }}
                    _active={{ opacity: 1 }}
                    onClick={() => setStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                {currentStep > 3 && <></>}
                {currentStep === 3 && (
                  <ProposeButton
                    w={'15vw'}
                    label={
                      transaction.isPending ? (
                        <Flex gap={3} align={'center'}>
                          <Spinner size="sm" />
                          submitting
                        </Flex>
                      ) : (
                        <Text>Propose</Text>
                      )
                    }
                    proposalAddress={`mdp-${contractName}`}
                    bg="secondary.900"
                    fontSize="md"
                    size="md"
                    _hover={{ opacity: 0.9 }}
                    _active={{ opacity: 1 }}
                    onFinish={onFinishUpdate}
                    startBlockHeight={startBlockHeight}
                  />
                )}{' '}
                {currentStep === 2 && (
                  <ContractDeployButton
                    title={title}
                    color="white"
                    bg="secondary.900"
                    colorScheme="base"
                    w={'15vw'}
                    contractName={`mdp-${contractName}`}
                    description={description}
                    setState={() => setStep(currentStep + 1)}
                  ></ContractDeployButton>
                )}
                {(currentStep === 0 || currentStep === 1) && (
                  <Button
                    type="submit"
                    rightIcon={<FaAngleRight />}
                    w={'15vw'}
                    color="white"
                    variant="outline"
                    bg={'transparent'}
                    _hover={{ opacity: 0.9 }}
                    _active={{ opacity: 1 }}
                  >
                    Next
                  </Button>
                )}
              </HStack>
            </form>
          </Container>
        </GridItem>
      </Grid>
    </motion.div>
  );
};

export default CreateProposal;
