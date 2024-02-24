'use client';
import {
  Box,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// Components
import { EmptyState } from '@lib/components/EmptyState';
import { Wrapper } from '@lib/components/Wrapper';
import { ProposalCard } from '@lib/components/cards';

// Queries
import { useAuth, useProposals } from '@common/queries';

//  Animation
import { SectionHeader } from '@lib/components/SectionHeader';
import { FADE_IN_VARIANTS } from '@utils/animation';
import { motion } from 'framer-motion';

// Icons
import { Header } from '@lib/components/Header';
import { ChooseModeModal } from '@lib/components/Modals/ChooseModeModal';
import { AppLayout } from '@lib/layout/AppLayout';
import { FaArrowRight, FaEllipsisH } from 'react-icons/fa';

const MotionGrid = motion(SimpleGrid);
const MotionProposalCard = motion(ProposalCard);

const Proposals = () => {
  const [filter, setFilter] = useState('all');
  const { data: proposals } = useProposals(filter);

  const { isLoading } = useAuth();
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setClient(true);
    }
  }, []);

  return (
    <>
      {client && (
        <AppLayout>
          <Header></Header>
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.25, type: 'linear' }}
          >
            <Wrapper>
              {proposals?.length === 0 ? (
                <>
                  <SectionHeader
                    justify="space-between"
                    align="center"
                    color="white"
                  >
                    <Box>
                      <HStack align="center">
                        <Text fontSize="lg" fontWeight="medium">
                          Proposals
                        </Text>
                        {!isLoading && <ChooseModeModal />}
                      </HStack>
                      <Text color="gray.900" fontSize="sm">
                        View the latest proposals.
                      </Text>
                    </Box>
                    <ButtonGroup
                      bg="base.900"
                      borderRadius="lg"
                      p="1"
                      spacing="2"
                    >
                      <Stack align="center" direction="row" spacing="3">
                        <RadioGroup onChange={setFilter} value={filter}>
                          <Stack direction="row">
                            <Radio
                              bg="base.900"
                              size="sm"
                              borderColor="base.500"
                              value="all"
                              _focus={{ outline: 'none' }}
                              _checked={{
                                bg: 'secondary.900',
                                color: 'white',
                                borderColor: 'base.600',
                              }}
                            >
                              All
                            </Radio>
                            <Radio
                              bg="base.900"
                              size="sm"
                              borderColor="base.500"
                              value="inactive"
                              _focus={{ outline: 'none' }}
                              _checked={{
                                bg: 'secondary.900',
                                color: 'white',
                                borderColor: 'base.600',
                              }}
                            >
                              Inactive
                            </Radio>
                            <Radio
                              bg="base.900"
                              size="sm"
                              borderColor="base.500"
                              value="active"
                              _focus={{ outline: 'none' }}
                              _checked={{
                                bg: 'secondary.900',
                                color: 'white',
                                borderColor: 'base.600',
                              }}
                            >
                              Active
                            </Radio>
                            <Radio
                              bg="base.900"
                              size="sm"
                              borderColor="base.500"
                              value="executed"
                              _focus={{ outline: 'none' }}
                              _checked={{
                                bg: 'secondary.900',
                                color: 'white',
                                borderColor: 'base.600',
                              }}
                            >
                              Executed
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </Stack>
                      <Stack align="center" direction="row" spacing="3">
                        <IconButton
                          display="none"
                          aria-label="action-item"
                          bg="base.800"
                          variant="outline"
                          color="light.900"
                          borderColor="base.500"
                          size="md"
                          icon={
                            <Icon
                              as={FaEllipsisH}
                              color="whiteAlpha"
                              fontSize="sm"
                            />
                          }
                          _hover={{
                            bg: 'base.800',
                          }}
                        />
                      </Stack>
                    </ButtonGroup>
                  </SectionHeader>
                  <EmptyState heading="No proposals found." />
                </>
              ) : (
                <>
                  <SectionHeader
                    justify="space-between"
                    align="center"
                    color="white"
                  >
                    <Box>
                      <HStack align="center">
                        <Text fontSize="lg" fontWeight="medium">
                          Proposals
                        </Text>
                        {!isLoading && <ChooseModeModal />}
                      </HStack>
                      <Text color="gray.900" fontSize="sm">
                        View the latest proposals.
                      </Text>
                    </Box>
                    <ButtonGroup
                      bg="base.900"
                      borderRadius="lg"
                      p="1"
                      spacing="2"
                    >
                      <Stack align="center" direction="row" spacing="3">
                        <RadioGroup onChange={setFilter} value={filter}>
                          <Stack direction="row">
                            <Radio
                              bg="base.900"
                              size="sm"
                              borderColor="base.500"
                              value="all"
                              _focus={{ outline: 'none' }}
                              _checked={{
                                bg: 'secondary.900',
                                color: 'white',
                                borderColor: 'base.600',
                              }}
                            >
                              All
                            </Radio>
                            <Radio
                              bg="base.900"
                              size="sm"
                              borderColor="base.500"
                              value="inactive"
                              _focus={{ outline: 'none' }}
                              _checked={{
                                bg: 'secondary.900',
                                color: 'white',
                                borderColor: 'base.600',
                              }}
                            >
                              Inactive
                            </Radio>
                            <Radio
                              bg="base.900"
                              size="sm"
                              borderColor="base.500"
                              value="active"
                              _focus={{ outline: 'none' }}
                              _checked={{
                                bg: 'secondary.900',
                                color: 'white',
                                borderColor: 'base.600',
                              }}
                            >
                              Active
                            </Radio>
                            <Radio
                              bg="base.900"
                              size="sm"
                              borderColor="base.500"
                              value="executed"
                              _focus={{ outline: 'none' }}
                              _checked={{
                                bg: 'secondary.900',
                                color: 'white',
                                borderColor: 'base.600',
                              }}
                            >
                              Executed
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </Stack>
                      <Stack align="center" direction="row" spacing="3">
                        <IconButton
                          display="none"
                          aria-label="action-item"
                          bg="base.800"
                          variant="outline"
                          color="light.900"
                          borderColor="base.500"
                          size="md"
                          icon={
                            <Icon
                              as={FaEllipsisH}
                              color="whiteAlpha"
                              fontSize="sm"
                            />
                          }
                          _hover={{
                            bg: 'base.800',
                          }}
                        />
                      </Stack>
                    </ButtonGroup>
                  </SectionHeader>

                  <MotionGrid
                    variants={FADE_IN_VARIANTS}
                    initial={FADE_IN_VARIANTS.hidden}
                    animate={FADE_IN_VARIANTS.enter}
                    exit={FADE_IN_VARIANTS.exit}
                    transition={{ duration: 0.5, type: 'linear' }}
                    columns={{ base: 1, md: 3 }}
                    spacing="6"
                    color="white"
                  >
                    {proposals?.map((proposal: any, index: number) => (
                      <MotionProposalCard
                        variants={{
                          hidden: { opacity: 0 },
                          enter: { opacity: 1 },
                        }}
                        key={index}
                        {...proposal}
                      />
                    ))}
                  </MotionGrid>
                  <SectionHeader justify="flex-end">
                    <Stack>
                      <IconButton
                        display="none"
                        aria-label="action-item"
                        bg="base.800"
                        variant="outline"
                        color="light.900"
                        borderColor="base.500"
                        size="md"
                        icon={
                          <Icon
                            as={FaArrowRight}
                            color="whiteAlpha"
                            fontSize="sm"
                          />
                        }
                        _hover={{
                          bg: 'base.800',
                        }}
                      />
                    </Stack>
                  </SectionHeader>
                </>
              )}
            </Wrapper>
          </motion.div>
        </AppLayout>
      )}
    </>
  );
};

export default Proposals;
