'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  FormControl,
  HStack,
  Input,
  Stack,
  Textarea,
  VStack,
  Spinner,
  Text,
} from '@chakra-ui/react';

// Web3
import { useNetwork } from '@micro-stacks/react';
import { fetchTransaction } from 'micro-stacks/api';

import { useForm } from 'react-hook-form';
import { useStep } from '@common/hooks';
import { usePolling } from '@common/hooks';

import { VerticalStep } from '@lib/components/VerticalStep';

//  Animation
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

// Utils
import { truncate } from '@common/helpers';
import Avatar from 'boring-avatars';
import {
  FaCheckCircle,
  FaAngleLeft,
  FaAngleRight,
  FaArrowLeft,
  FaPaperclip,
} from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

// Store
import CodeEditor from '@lib/components/CodeEditor';
import { useStore } from '@lib/store/TransactionStore';
import { useGenerateName } from '@lib/common/queries';

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

const CreateProposal = () => {
  const { network } = useNetwork();
  const router = useRouter();
  const { transaction, setTransaction } = useStore();
  const [state, setState] = useState({ isDeployed: false });
  const { isDeployed } = state;
  const { register, getValues } = useForm({
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

  const handleGoBack = () => {
    setTransaction({ txId: '', data: {} });
    router.back();
  };

  useEffect(() => {
    if (transaction.txId) {
      console.log({ transaction });
    }
  }, [transaction]);

  usePolling(() => {
    fetchTransactionData(transaction?.txId);
  }, transaction.txId);

  async function fetchTransactionData(transactionId: string) {
    try {
      const transaction = await fetchTransaction({
        url: network.getCoreApiUrl(),
        txid: transactionId,
        event_offset: 0,
        event_limit: 0,
      });
      if (transaction?.tx_status === 'success') {
        setState({ ...state, isDeployed: true });
        setTransaction({ txId: '', data: {} });
        // onComplete(transaction);
      }
      console.log({ transaction });
    } catch (e: any) {
      console.log({ e });
    }
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
      title: 'Review & Submit',
      description: null,
    },
  ];

  const SmartContractCode = () => {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.5, type: 'linear' }}
      >
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
            <CodeEditor></CodeEditor>
          </Stack>
        </Stack>
      </motion.div>
    );
  };

  const ProposalDetails = () => {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.5, type: 'linear' }}
      >
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
              {...register('title', {
                required: 'This is required',
              })}
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
              py="1"
              px="2"
              pl="2"
              bg="base.900"
              border="none"
              rows={10}
              resize="none"
              autoComplete="off"
              placeholder="This proposal once passed will..."
              {...register('description', {
                required: 'This is required',
              })}
              _focus={{
                border: 'none',
              }}
            />
          </FormControl>
        </Stack>
      </motion.div>
    );
  };

  const ProposalReview = () => {
    const { data: contractName } = useGenerateName();
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.5, type: 'linear' }}
      >
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
                {title && truncate(title, 75, 0)}
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
                {description && truncate(description, 75, 0)}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </motion.div>
    );
  };

  const ProposalDeploy = () => {
    return (
      <>
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
              MDP Transfer STX
            </Text>
          </Stack>
          <Stack
            display="contents"
            justify="space-between"
            align="center"
            spacing="5"
          >
            <Stack
              justifyContent="space-between"
              borderBottom="1px solid"
              borderBottomColor="base.500"
              flexDirection={{ base: 'column', md: 'row' }}
              alignItems="center"
              w="100%"
            >
              <Text
                color="gray.900"
                fontWeight="medium"
                mb={{ base: '10px', md: '0px' }}
              >
                Transferring
              </Text>
              <Flex
                align="center"
                flexDirection={{ base: 'column', md: 'row' }}
                mb={{ base: '20px', md: '0px' }}
              >
                <HStack>
                  <Image
                    cursor="pointer"
                    height="15px"
                    src="https://cryptologos.cc/logos/stacks-stx-logo.png?v=022"
                    alt="logo"
                  />
                  <Text fontSize="md" fontWeight="medium" color="light.900">
                    {10}
                  </Text>
                  <Text fontSize="md" fontWeight="regular" color="gray.900">
                    STX
                  </Text>
                </HStack>
                <Button
                  variant="setup"
                  px="24px"
                  onClick={() => console.log('edit')}
                  fontSize="md"
                  fontWeight="500"
                >
                  Edit
                </Button>
              </Flex>
            </Stack>
            <Stack
              justifyContent="space-between"
              borderBottom="1px solid"
              borderBottomColor="base.500"
              flexDirection={{ base: 'column', md: 'row' }}
              alignItems="center"
              w="100%"
            >
              <Text
                color="gray.900"
                fontSize="md"
                mb={{ base: '10px', md: '0px' }}
              >
                To
              </Text>
              <Flex
                align="center"
                flexDirection={{ base: 'column', md: 'row' }}
                mb={{ base: '20px', md: '0px' }}
              >
                <HStack>
                  <FiSend fontSize="0.9rem" />
                  <Text fontSize="md" fontWeight="medium" color="light.900">
                    {10}
                  </Text>
                </HStack>
                <Button
                  variant="setup"
                  px="24px"
                  onClick={() => console.log('edit')}
                  fontSize="md"
                  fontWeight="500"
                >
                  Edit
                </Button>
              </Flex>
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
                {description && truncate(description, 75, 0)}
              </Text>
            </Stack>
          </Stack>
          <HStack width="full" justify="space-between">
            <Button
              color="white"
              variant="link"
              fontSize="md"
              size="md"
              _hover={{ opacity: 0.9 }}
              _active={{ opacity: 1 }}
              onClick={() => setStep(currentStep - 1)}
            >
              Previous
            </Button>
            {/* <TransferStxButton
              organization={organization}
              isSubmitting={isSubmitting}
              description={formatComments(description)}
              transferAmount={transferAmount}
              transferTo={transferTo}
            /> */}
          </HStack>
        </Stack>
      </>
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
        return <ProposalDeploy />;
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
          <HStack
            position="relative"
            bottom="3"
            cursor="pointer"
            onClick={handleGoBack}
            color="gray.900"
            _hover={{
              textDecoration: 'underline',
              color: 'light.900',
            }}
          >
            <FaArrowLeft fontSize="0.9rem" />
            <Text>Back</Text>
          </HStack>
          {transaction.txId ? (
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
                  colors={[
                    '#50DDC3',
                    '#624AF2',
                    '#EB00FF',
                    '#7301FA',
                    '#25C2A0',
                  ]}
                />
                <Text fontSize="2xl" fontWeight="semibold" color="light.900">
                  MDP Transfer STX
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
                      <Spinner size="xs" color="secondary.900" speed="0.75s" />
                      <Text>Deploying contract</Text>
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
                <Stack
                  justifyContent="space-between"
                  borderBottom="1px solid"
                  borderBottomColor="base.500"
                  flexDirection={{ base: 'column', md: 'row' }}
                  alignItems="center"
                  w="100%"
                >
                  <Text
                    color="gray.900"
                    fontWeight="medium"
                    mb={{ base: '10px', md: '0px' }}
                  >
                    Transferring
                  </Text>
                  <Flex
                    align="center"
                    flexDirection={{ base: 'column', md: 'row' }}
                    mb={{ base: '20px', md: '0px' }}
                  >
                    <HStack>
                      <Image
                        cursor="pointer"
                        height="15px"
                        src="https://cryptologos.cc/logos/stacks-stx-logo.png?v=022"
                        alt="logo"
                      />
                      <Text fontSize="md" fontWeight="medium" color="light.900">
                        {10}
                      </Text>
                      <Text fontSize="md" fontWeight="regular" color="gray.900">
                        STX
                      </Text>
                    </HStack>
                    <Button
                      variant="setup"
                      px="24px"
                      onClick={() => console.log('edit')}
                      fontSize="md"
                      fontWeight="500"
                    >
                      Edit
                    </Button>
                  </Flex>
                </Stack>
                <Stack
                  justifyContent="space-between"
                  borderBottom="1px solid"
                  borderBottomColor="base.500"
                  flexDirection={{ base: 'column', md: 'row' }}
                  alignItems="center"
                  w="100%"
                >
                  <Text
                    color="gray.900"
                    fontSize="md"
                    mb={{ base: '10px', md: '0px' }}
                  >
                    To
                  </Text>
                  <Flex
                    align="center"
                    flexDirection={{ base: 'column', md: 'row' }}
                    mb={{ base: '20px', md: '0px' }}
                  >
                    <HStack>
                      <FiSend fontSize="0.9rem" />
                      <Text fontSize="md" fontWeight="medium" color="light.900">
                        {10}
                      </Text>
                    </HStack>
                    <Button
                      variant="setup"
                      px="24px"
                      onClick={() => console.log('edit')}
                      fontSize="md"
                      fontWeight="500"
                    >
                      Edit
                    </Button>
                  </Flex>
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
                    {description && truncate(description, 75, 0)}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          ) : isDeployed ? (
            <Stack
              maxW="md"
              spacing="8"
              mx="auto"
              direction={{ base: 'column', md: 'column' }}
              justify="space-between"
              align="center"
              color="white"
            >
              <Confetti
                height={1200}
                width={1280}
                recycle={false}
                numberOfPieces={250}
                gravity={0.15}
                colors={['#50DDC3', '#624AF2', '#EB00FF', '#7301FA', '#25C2A0']}
              />
              <Stack mb="5" align="center" spacing="3">
                <Avatar
                  size={50}
                  name="MDP Transfer STX"
                  variant="bauhaus"
                  colors={[
                    '#50DDC3',
                    '#624AF2',
                    '#EB00FF',
                    '#7301FA',
                    '#25C2A0',
                  ]}
                />
                <Text fontSize="2xl" fontWeight="semibold" color="light.900">
                  MDP Transfer STX
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
                <Stack
                  justifyContent="space-between"
                  borderBottom="1px solid"
                  borderBottomColor="base.500"
                  flexDirection={{ base: 'column', md: 'row' }}
                  alignItems="center"
                  w="100%"
                >
                  <Text
                    color="gray.900"
                    fontWeight="medium"
                    mb={{ base: '10px', md: '0px' }}
                  >
                    Transferring
                  </Text>
                  <Flex
                    align="center"
                    flexDirection={{ base: 'column', md: 'row' }}
                    mb={{ base: '20px', md: '0px' }}
                  >
                    <HStack>
                      <Image
                        cursor="pointer"
                        height="15px"
                        src="https://cryptologos.cc/logos/stacks-stx-logo.png?v=022"
                        alt="logo"
                      />
                      <Text fontSize="md" fontWeight="medium" color="light.900">
                        {10}
                      </Text>
                      <Text fontSize="md" fontWeight="regular" color="gray.900">
                        STX
                      </Text>
                    </HStack>
                    <Button
                      variant="setup"
                      px="24px"
                      onClick={() => console.log('edit')}
                      fontSize="md"
                      fontWeight="500"
                    >
                      Edit
                    </Button>
                  </Flex>
                </Stack>
                <Stack
                  justifyContent="space-between"
                  borderBottom="1px solid"
                  borderBottomColor="base.500"
                  flexDirection={{ base: 'column', md: 'row' }}
                  alignItems="center"
                  w="100%"
                >
                  <Text
                    color="gray.900"
                    fontSize="md"
                    mb={{ base: '10px', md: '0px' }}
                  >
                    To
                  </Text>
                  <Flex
                    align="center"
                    flexDirection={{ base: 'column', md: 'row' }}
                    mb={{ base: '20px', md: '0px' }}
                  >
                    <HStack>
                      <FiSend fontSize="0.9rem" />
                      <Text fontSize="md" fontWeight="medium" color="light.900">
                        {10}
                      </Text>
                    </HStack>
                    <Button
                      variant="setup"
                      px="24px"
                      onClick={() => console.log('edit')}
                      fontSize="md"
                      fontWeight="500"
                    >
                      Edit
                    </Button>
                  </Flex>
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
                    {description && truncate(description, 75, 0)}
                  </Text>
                </Stack>
              </Stack>
              <HStack width="full" justify="space-between">
                <Button
                  bg="secondary.900"
                  fontSize="md"
                  size="md"
                  _hover={{ opacity: 0.9 }}
                  _active={{ opacity: 1 }}
                >
                  Submit proposal
                </Button>
              </HStack>
            </Stack>
          ) : (
            <FormControl>
              <ViewStep />
              <HStack
                justify="end"
                position={'fixed'}
                bottom={'20'}
                right={'20'}
              >
                <Button
                  minW="50%"
                  bg="base.800"
                  color="white"
                  leftIcon={<FaAngleLeft />}
                  _hover={{ opacity: 0.9 }}
                  _active={{ opacity: 1 }}
                  onClick={() => {
                    if (currentStep === 0) {
                      return;
                    }
                    setStep(currentStep - 1);
                  }}
                >
                  Previous
                </Button>
                <Button
                  minW="50%"
                  bg="base.800"
                  color="white"
                  rightIcon={<FaAngleRight />}
                  onClick={() => {
                    if (currentStep === 2) {
                      return;
                    }
                    setStep(currentStep + 1);
                  }}
                  _hover={{ opacity: 0.9 }}
                  _active={{ opacity: 1 }}
                >
                  {currentStep === 2 ? 'Submit' : 'Next'}
                </Button>
              </HStack>
            </FormControl>
          )}
        </GridItem>
      </Grid>
    </motion.div>
  );
};

export default CreateProposal;
