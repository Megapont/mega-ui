'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Box,
  Badge,
  Button,
  ButtonGroup,
  Container,
  Divider,
  HStack,
  Progress,
  Stack,
  VStack,
  SimpleGrid,
  Tab,
  Tabs,
  TabPanel,
  TabList,
  TabPanels,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import { defaultTo } from 'lodash';

// Components
import { ProposalActivityTable } from '@lib/components/tables/ProposalActivityTable';
import { Card } from '@lib/components/Card';
import { WalletConnectButton } from '@lib/components/WalletConnectButton';

//  Animation
import { motion } from 'framer-motion';

// Icons
import {
  FaExclamationCircle,
  FaClock,
  FaCheckCircle,
  FaInfoCircle,
  FaArrowLeft,
} from 'react-icons/fa';

// Stacks
import { useCurrentStxAddress } from '@micro-stacks/react';

// Utils
import {
  estimateDays,
  convertToken,
  getPercentage,
  tokenToNumber,
} from '@common/helpers';

// Queries
import {
  useAuth,
  useEvents,
  useProposal,
  useToken,
  useTokenBalance,
} from '@common/queries';

// Hooks
import { useBlocks } from '@common/hooks';

// Mutations
import { useDisableProposal } from '@common/mutations/proposals';
import { MEGA_VOTING_CONTRACT } from '@lib/common/constants';
import { supabase } from '@lib/utils/supabase';
import { VoteManyButton } from '@lib/components/Actions/Voting/VoteManyButton';
import { ExecuteButton } from '@lib/components/Actions/ExecuteButton';
import { ProposeButton } from '@lib/components/Actions/ProposeButton';
import { EmptyState } from '@lib/components/EmptyState';

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

const SLIDE_UP_BUTTON_VARIANTS = {
  hidden: { opacity: 0, x: 0, y: 15 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -15 },
};

const ProposalView = ({ params }: { params: { id: string } }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const currentStxAddress = useCurrentStxAddress();
  const router = useRouter();

  const proposalPrincipal = params.id;

  const { mutate: disableProposal } = useDisableProposal();
  const { currentBlockHeight } = useBlocks();
  const { isSignedIn } = useAuth();
  const { token } = useToken();
  const { balance } = useTokenBalance();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [info, setInfo] = useState({
    title: '',
    description: '',
  });
  const voting = { contractAddress: MEGA_VOTING_CONTRACT };
  const {
    isLoading,
    isIdle,
    data: proposalInfo,
  } = useProposal(proposalPrincipal);
  const { data: voterEvents } = useEvents(
    voting.contractAddress,
    'vote',
    proposalPrincipal,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error }: any = await supabase
          .from('Proposals')
          .select('title, description, contractAddress')
          .eq('contractAddress', proposalPrincipal);
        if (error) throw error;
        if (data) {
          setInfo({
            title: data[0].title,
            description: data[0].description,
          });
        }
      } catch (e: any) {
        console.error({ e });
      }
    };
    fetchData();
  }, [currentStxAddress, proposalPrincipal]);

  const proposalContractAddress = proposalInfo?.contractAddress.split('.')[0];
  const proposalContractName = proposalInfo?.contractAddress.split('.')[1];

  const onDisable = async () => {
    try {
      disableProposal({ contractAddress: proposalPrincipal, disabled: true });
    } catch (e: any) {
      console.error({ e });
    }
  };

  const isEligible = balance >= Number(proposalInfo?.voteThreshold);

  const totalVotes =
    Number(proposalInfo?.proposal?.votesFor) +
    Number(proposalInfo?.proposal?.votesAgainst);
  const currentVoterEvent = (event: any) =>
    event?.voter?.value === currentStxAddress;

  const hasVoted = voterEvents?.some(currentVoterEvent);
  const isInactive =
    currentBlockHeight < proposalInfo?.proposal?.startBlockHeight;
  const isClosed =
    currentBlockHeight > Number(proposalInfo?.proposal?.endBlockHeight);
  const isExecutable =
    currentBlockHeight >=
    Number(proposalInfo?.proposal?.endBlockHeight) +
      Number(proposalInfo?.executionDelay);
  const canExecute = isEligible && isExecutable;
  const isOpen =
    currentBlockHeight <= proposalInfo?.proposal?.endBlockHeight &&
    currentBlockHeight >= proposalInfo?.proposal?.startBlockHeight;
  const convertedVotesFor = tokenToNumber(
    Number(proposalInfo?.proposal?.votesFor),
    Number(token?.decimals) || 2
  );
  const convertedVotesAgainst = tokenToNumber(
    Number(proposalInfo?.proposal?.votesAgainst),
    Number(token?.decimals) || 2
  );
  const convertedTotalVotes = tokenToNumber(
    Number(totalVotes),
    Number(token?.decimals) || 2
  );
  const isPassing =
    convertedVotesFor > convertedVotesAgainst &&
    convertedTotalVotes >= Number(proposalInfo?.quorumThreshold);

  if (isLoading || isIdle) {
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
                <EmptyState heading="Fetching proposal data..." />
              </Stack>
            </motion.div>
          </Container>
        </Stack>
      </Container>
    );
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.75, type: 'linear' }}
    >
      <Container maxW="5xl">
        <Container>
          <Box py="6" my="6">
            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2 }}
              alignItems="flex-start"
              spacing="8"
            >
              <VStack
                align="left"
                maxW="lg"
                spacing="6"
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                color="white"
              >
                <Stack spacing="1">
                  <HStack
                    mb="1"
                    cursor="pointer"
                    onClick={() => router.back()}
                    color="gray.900"
                    _hover={{
                      textDecoration: 'underline',
                      color: 'light.900',
                    }}
                  >
                    <FaArrowLeft fontSize="0.9rem" />
                    <Text>Back</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="4xl" fontWeight="medium" color="light.600">
                      {info?.title}
                    </Text>
                  </HStack>
                  <HStack>
                    {!proposalInfo?.proposal ? (
                      <Badge
                        bg="base.800"
                        color="secondary.900"
                        size="sm"
                        px="3"
                        py="1"
                      >
                        <HStack>
                          <FaInfoCircle fontSize="0.9rem" />
                          <Text fontSize="sm" fontWeight="medium">
                            Inactive
                          </Text>
                        </HStack>
                      </Badge>
                    ) : proposalInfo?.proposal?.concluded ? (
                      <Badge
                        bg="base.800"
                        color="secondary.900"
                        size="sm"
                        px="3"
                        py="1"
                      >
                        <HStack>
                          <FaInfoCircle fontSize="0.9rem" />
                          <Text fontSize="sm" fontWeight="medium">
                            Proposal is concluded
                          </Text>
                        </HStack>
                      </Badge>
                    ) : isExecutable && !isEligible ? (
                      <Badge
                        bg="base.800"
                        color="secondary.900"
                        size="sm"
                        px="3"
                        py="1"
                      >
                        <HStack>
                          <FaExclamationCircle fontSize="0.9rem" />

                          <Text fontSize="sm" fontWeight="medium">
                            At least{' '}
                            {convertToken(
                              Number(proposalInfo?.voteThreshold).toString(),
                              token?.decimals || 2
                            )}{' '}
                            {token?.symbol || 'MEGA'} required to execute
                          </Text>
                        </HStack>
                      </Badge>
                    ) : isClosed && !canExecute ? (
                      <Badge
                        bg="base.800"
                        color="secondary.900"
                        size="sm"
                        px="3"
                        py="1"
                      >
                        <HStack>
                          <FaClock fontSize="0.9rem" />
                          <Text fontSize="sm" fontWeight="medium">
                            Open for execution in ~{' '}
                            {Number(proposalInfo?.proposal?.endBlockHeight) +
                              Number(proposalInfo?.executionDelay) -
                              Number(currentBlockHeight)}{' '}
                            blocks
                          </Text>
                        </HStack>
                      </Badge>
                    ) : canExecute && !proposalInfo?.proposal?.concluded ? (
                      <Badge
                        bg="base.800"
                        color="secondary.900"
                        size="sm"
                        px="3"
                        py="1"
                      >
                        <HStack>
                          <FaClock fontSize="0.9rem" />
                          <Text fontSize="sm" fontWeight="medium">
                            Ready to {isPassing ? `execute` : `conclude`}
                          </Text>
                        </HStack>
                      </Badge>
                    ) : hasVoted ? (
                      <Badge
                        bg="base.800"
                        color="secondary.900"
                        size="sm"
                        px="3"
                        py="1"
                      >
                        <HStack>
                          <FaCheckCircle fontSize="0.9rem" />
                          <Text fontSize="sm" fontWeight="medium">
                            Voted
                          </Text>
                        </HStack>
                      </Badge>
                    ) : isInactive ? (
                      <Badge
                        bg="base.800"
                        color="secondary.900"
                        size="sm"
                        px="3"
                        py="1"
                      >
                        <HStack>
                          <FaClock fontSize="0.9rem" />
                          <Text fontSize="sm" fontWeight="medium">
                            Voting begins in ~{' '}
                            {Number(proposalInfo?.proposal?.startBlockHeight) -
                              Number(currentBlockHeight)}{' '}
                            blocks{' '}
                          </Text>
                        </HStack>
                      </Badge>
                    ) : !isEligible && currentStxAddress ? (
                      <Badge
                        bg="base.800"
                        color="secondary.900"
                        size="sm"
                        px="3"
                        py="1"
                      >
                        <HStack>
                          <FaExclamationCircle fontSize="0.9rem" />

                          <Text fontSize="sm" fontWeight="medium">
                            At least{' '}
                            {convertToken(
                              Number(proposalInfo?.voteThreshold).toString(),
                              token?.decimals || 2
                            )}{' '}
                            {token?.symbol || 'MEGA'} required to vote
                          </Text>
                        </HStack>
                      </Badge>
                    ) : (
                      <Badge
                        bg="base.800"
                        color="secondary.900"
                        size="sm"
                        px="3"
                        py="1"
                      >
                        Pending
                      </Badge>
                    )}
                  </HStack>
                  <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial={FADE_IN_VARIANTS.hidden}
                    animate={FADE_IN_VARIANTS.enter}
                    exit={FADE_IN_VARIANTS.exit}
                    transition={{ duration: 0.25, type: 'linear' }}
                  >
                    {proposalInfo?.proposal && (
                      <Stack mt="2" spacing="3">
                        <Stack>
                          <Text
                            color="gray.900"
                            fontSize="sm"
                            fontWeight="semibold"
                          >
                            Yes ({convertedVotesFor})
                          </Text>
                          <Progress
                            colorScheme="secondary"
                            size="md"
                            value={getPercentage(
                              totalVotes,
                              Number(proposalInfo?.proposal?.votesFor)
                            )}
                            bg="base.500"
                          />
                        </Stack>
                        <Stack>
                          <Text
                            color="gray.900"
                            fontSize="sm"
                            fontWeight="semibold"
                          >
                            No ({convertedVotesAgainst})
                          </Text>
                          <Progress
                            colorScheme="red"
                            size="md"
                            value={getPercentage(
                              totalVotes,
                              Number(proposalInfo?.proposal?.votesAgainst)
                            )}
                            bg="base.500"
                          />
                        </Stack>
                        <Stack>
                          <Text
                            color="gray.900"
                            fontSize="sm"
                            fontWeight="semibold"
                          >
                            Quorum ({convertedVotesFor + convertedVotesAgainst})
                          </Text>
                          <Progress
                            colorScheme="gray"
                            size="md"
                            value={getPercentage(
                              Number(
                                convertToken(
                                  Number(
                                    proposalInfo?.quorumThreshold
                                  ).toString(),
                                  token?.decimals || 2
                                )
                              ),
                              convertedVotesFor + convertedVotesAgainst
                            )}
                            bg="base.500"
                          />
                        </Stack>
                      </Stack>
                    )}
                  </motion.div>
                </Stack>
                {!proposalInfo?.proposal ? (
                  <ButtonGroup>
                    <ProposeButton
                      bg="base.800"
                      color="light.900"
                      text="Propose"
                      _disabled={{
                        bg: 'base.800',
                        opacity: 0.5,
                        cursor: 'not-allowed',
                      }}
                      _hover={{
                        bg: 'base.800',
                        opacity: 0.5,
                      }}
                      notDeployer={
                        proposalContractAddress !== currentStxAddress
                      }
                      w="20vw"
                      proposalPrincipal={proposalPrincipal}
                    />
                    {!isRemoving ? (
                      <Button
                        color="red.500"
                        variant="outline"
                        bg="transparent"
                        borderColor="red.500"
                        size="md"
                        onClick={() => setIsRemoving(true)}
                        disabled={proposalContractAddress !== currentStxAddress}
                        _disabled={{
                          bg: 'transparent',
                          opacity: 0.5,
                          cursor: 'not-allowed',
                          _hover: {
                            bg: 'transparent',
                            opacity: 0.5,
                            cursor: 'not-allowed',
                          },
                        }}
                        _hover={{ opacity: 0.9 }}
                        _active={{ opacity: 1 }}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        bg="red.900"
                        color="white"
                        size="md"
                        variant="outline"
                        fontWeight="semibold"
                        onClick={onDisable}
                        _hover={{ opacity: 0.9 }}
                        _active={{ opacity: 1 }}
                      >
                        Confirm
                      </Button>
                    )}
                  </ButtonGroup>
                ) : null}
                {!isSignedIn ? (
                  <WalletConnectButton
                    color="base.900"
                    fontWeight="medium"
                    bg="light.900"
                    _hover={{ opacity: 0.9 }}
                    _active={{ opacity: 1 }}
                  />
                ) : isEligible && isOpen && !hasVoted ? (
                  <motion.div
                    variants={SLIDE_UP_BUTTON_VARIANTS}
                    initial={SLIDE_UP_BUTTON_VARIANTS.hidden}
                    animate={SLIDE_UP_BUTTON_VARIANTS.enter}
                    exit={SLIDE_UP_BUTTON_VARIANTS.exit}
                    transition={{ duration: 0.85, type: 'linear' }}
                  >
                    <HStack
                      width="full"
                      mt="5"
                      justifyContent="flex-start"
                      spacing="6"
                    >
                      <VoteManyButton
                        text="Approve"
                        color="white"
                        bg="secondary.900"
                        proposalPrincipal={proposalPrincipal}
                        voteFor={true}
                        _hover={{ opacity: 0.9 }}
                        _active={{ opacity: 1 }}
                        _disabled={{
                          bg: 'secondary.900',
                          opacity: 0.5,
                          cursor: 'not-allowed',
                          _hover: {
                            bg: 'secondary.900',
                            opacity: 0.5,
                            cursor: 'not-allowed',
                          },
                        }}
                      />
                      <VoteManyButton
                        text="Reject"
                        color="white"
                        bg="base.800"
                        proposalPrincipal={proposalPrincipal}
                        voteFor={false}
                        _hover={{ opacity: 0.9 }}
                        _active={{ opacity: 1 }}
                        _disabled={{
                          bg: 'base.800',
                          opacity: 0.5,
                          cursor: 'not-allowed',
                          _hover: {
                            bg: 'base.800',
                            opacity: 0.5,
                            cursor: 'not-allowed',
                          },
                        }}
                      />
                    </HStack>
                  </motion.div>
                ) : canExecute && !proposalInfo?.proposal?.concluded ? (
                  <ExecuteButton
                    color="white"
                    bg="secondary.900"
                    proposalPrincipal={proposalPrincipal}
                    _hover={{ opacity: 0.9 }}
                    _active={{ opacity: 1 }}
                    _disabled={{
                      bg: 'secondary.900',
                      opacity: 0.5,
                      cursor: 'not-allowed',
                      _hover: {
                        bg: 'secondary.900',
                        opacity: 0.5,
                        cursor: 'not-allowed',
                      },
                    }}
                  />
                ) : null}
              </VStack>
              {proposalInfo?.proposal && (
                <Card bg="base.900" border="1px solid" borderColor="base.500">
                  <Box
                    py={{ base: '3', md: '3' }}
                    px={{ base: '6', md: '6' }}
                    bg="base.800"
                    borderTopLeftRadius="lg"
                    borderTopRightRadius="lg"
                  >
                    <HStack justify="space-between">
                      <Text fontSize="sm" fontWeight="medium" color="gray.900">
                        Voting power
                      </Text>
                      <Text color="light.900" fontWeight="regular">
                        {convertToken(
                          defaultTo(balance, 0)?.toString(),
                          Number(token?.decimals || 2)
                        )}{' '}
                        <Text as="span" color="gray.900" fontWeight="medium">
                          {token?.symbol || 'MEGA'}
                        </Text>
                      </Text>
                    </HStack>
                  </Box>

                  <Divider borderColor="base.500" />
                  <Stack
                    spacing={{ base: '0', md: '1' }}
                    justify="center"
                    py={{ base: '3', md: '3' }}
                    px={{ base: '6', md: '6' }}
                  >
                    <Stack spacing="5">
                      <HStack justify="space-between">
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.900"
                        >
                          Start Block
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="light.900"
                        >
                          {Number(proposalInfo?.proposal?.startBlockHeight)}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.900"
                        >
                          End Block
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="light.900"
                        >
                          {/* TODO: get executionDelay from voting
                            contracts and add to endBlockHeight */}
                          {Number(proposalInfo?.proposal?.endBlockHeight)}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.900"
                        >
                          Execution Block
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="light.900"
                        >
                          {/* TODO: get executionDelay from voting
                            contracts and add to endBlockHeight */}
                          {Number(proposalInfo?.proposal?.endBlockHeight) +
                            Number(proposalInfo?.executionDelay)}
                        </Text>
                      </HStack>
                      <Divider />
                      <HStack justify="space-between">
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.900"
                        >
                          Current Block
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="light.900"
                        >
                          {Number(currentBlockHeight)}
                        </Text>
                      </HStack>
                      <Divider />
                      <HStack justify="space-between">
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.900"
                        >
                          Quorum
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="light.900"
                        >
                          {convertToken(
                            Number(proposalInfo?.quorumThreshold).toString(),
                            Number(token?.decimals || 2)
                          )}{' '}
                          {token?.symbol || 'MEGA'}
                        </Text>
                      </HStack>
                      <Divider />
                      <HStack justify="space-between">
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.900"
                        >
                          Voting Begins
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="light.900"
                        >
                          {Number(currentBlockHeight) <
                          Number(proposalInfo?.proposal?.startBlockHeight)
                            ? `~ ${estimateDays(
                                Number(
                                  proposalInfo?.proposal?.startBlockHeight
                                ) - Number(currentBlockHeight)
                              )} days`
                            : `Now`}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.900"
                        >
                          Vote Deadline
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="light.900"
                        >
                          {Number(currentBlockHeight) >
                          Number(proposalInfo?.proposal?.endBlockHeight)
                            ? `Closed`
                            : `~ ${estimateDays(
                                Number(proposalInfo?.proposal?.endBlockHeight) -
                                  Number(currentBlockHeight)
                              )} days`}
                        </Text>
                      </HStack>
                    </Stack>
                  </Stack>
                </Card>
              )}
            </SimpleGrid>
          </Box>
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.75, type: 'linear' }}
          >
            <Box as="section">
              <Stack spacing={{ base: '8', lg: '6' }}>
                <Stack w="auto">
                  <Box as="section">
                    <Tabs color="white" variant="unstyled">
                      <TabList>
                        <ButtonGroup bg="base.800" borderRadius="lg" p="1">
                          {['Details', 'Activity'].map((item) => (
                            <Tab
                              key={item}
                              fontSize="sm"
                              borderRadius="lg"
                              color="gray.900"
                              px="5"
                              w="50%"
                              _selected={{
                                bg: 'base.500',
                                color: 'light.900',
                              }}
                            >
                              {item}
                            </Tab>
                          ))}
                        </ButtonGroup>
                      </TabList>
                      <TabPanels>
                        <TabPanel px="0">
                          <motion.div
                            variants={FADE_IN_VARIANTS}
                            initial={FADE_IN_VARIANTS.hidden}
                            animate={FADE_IN_VARIANTS.enter}
                            exit={FADE_IN_VARIANTS.exit}
                            transition={{ duration: 0.25, type: 'linear' }}
                          >
                            <Stack>
                              <Stack
                                spacing="4"
                                direction={{ base: 'column', md: 'column' }}
                                color="white"
                              >
                                <Stack>
                                  <Box>
                                    <Text
                                      fontSize="md"
                                      fontWeight="regular"
                                      color="gray.900"
                                    >
                                      Description
                                    </Text>
                                  </Box>
                                  <Text
                                    fontSize="md"
                                    _selection={{
                                      bg: 'base.800',
                                      color: 'secondary.900',
                                    }}
                                  >
                                    {info?.description}
                                  </Text>
                                </Stack>
                                <Stack align="flex-start">
                                  <Box>
                                    <Text
                                      fontSize="md"
                                      fontWeight="regular"
                                      color="gray.900"
                                    >
                                      Code
                                    </Text>
                                  </Box>
                                  <Button
                                    as="a"
                                    variant="link"
                                    target="_blank"
                                    href={
                                      process.env.NODE_ENV !== 'production'
                                        ? `http://localhost:8000/txid/${proposalContractAddress}.${proposalContractName}?chain=testnet`
                                        : `https://explorer.stacks.co/txid/${proposalContractAddress}.${proposalContractName}?chain=mainnet`
                                    }
                                  >
                                    <Text
                                      cursor="pointer"
                                      fontSize="md"
                                      _selection={{
                                        bg: 'base.800',
                                        color: 'secondary.900',
                                      }}
                                    >
                                      View source code
                                    </Text>
                                  </Button>
                                </Stack>
                              </Stack>
                            </Stack>
                          </motion.div>
                        </TabPanel>

                        <TabPanel px="0">
                          <motion.div
                            variants={FADE_IN_VARIANTS}
                            initial={FADE_IN_VARIANTS.hidden}
                            animate={FADE_IN_VARIANTS.enter}
                            exit={FADE_IN_VARIANTS.exit}
                            transition={{ duration: 0.25, type: 'linear' }}
                          >
                            <ProposalActivityTable
                              color="light.900"
                              size="md"
                              proposalPrincipal={`${proposalContractAddress}.${proposalContractName}`}
                            />
                          </motion.div>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Container>
    </motion.div>
  );
};

export default ProposalView;
