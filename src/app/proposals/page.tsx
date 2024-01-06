'use client';
import { useState } from 'react';
import {
  Box,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

// Components

import { EmptyState } from '@lib/components/EmptyState';
import { ProposalCard } from '@lib/components/cards';
import { Wrapper } from '@lib/components/Wrapper';

// Queries
import { useProposals } from '@common/queries';

//  Animation
import { motion } from 'framer-motion';
import { FADE_IN_VARIANTS } from '@utils/animation';
import { SectionHeader } from '@lib/components/SectionHeader';

// Icons
import { FaArrowRight, FaEllipsisH } from 'react-icons/fa';
import { Header } from '@lib/components/Header';
import { AppLayout } from '@lib/layout/AppLayout';

const MotionGrid = motion(SimpleGrid);
const MotionProposalCard = motion(ProposalCard);

const Proposals = () => {
  const [filter, setFilter] = useState('all');
  const { data: proposals } = useProposals(filter);

  return (
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
                  </HStack>
                  <Text color="gray.900" fontSize="sm">
                    View the latest proposals.
                  </Text>
                </Box>
                <ButtonGroup bg="base.900" borderRadius="lg" p="1" spacing="2">
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
                            borderColor: 'base.500',
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
                            borderColor: 'base.500',
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
                            borderColor: 'base.500',
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
                            borderColor: 'base.500',
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
                  </HStack>
                  <Text color="gray.900" fontSize="sm">
                    View the latest proposals.
                  </Text>
                </Box>
                <ButtonGroup bg="base.900" borderRadius="lg" p="1" spacing="2">
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
                            bg: 'red.600',
                            color: 'white',
                            borderColor: 'red.900',
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
                            bg: 'red.600',
                            color: 'white',
                            borderColor: 'red.900',
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
                            bg: 'red.600',
                            color: 'white',
                            borderColor: 'red.900',
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
                            bg: 'red.600',
                            color: 'white',
                            borderColor: 'red.900',
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
  );
};

export default Proposals;
