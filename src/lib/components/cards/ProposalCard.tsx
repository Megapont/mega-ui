'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Badge, HStack, Icon, Stack, Text } from '@chakra-ui/react';

// Hooks
import { useBlocks } from '@common/hooks';

// Components
import { Card } from '@lib/components/Card';

// Animation
import { motion } from 'framer-motion';

// Utils
import { truncate } from '@common/helpers';
import Avatar from 'boring-avatars';
import { FiArrowUpRight } from 'react-icons/fi';

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

export const ProposalCard = ({
  contractAddress,
  title,
  description,
  startBlockHeight,
  endBlockHeight,
  concluded,
}: any) => {
  const [isHovered, setHovered] = useState(false);
  const { currentBlockHeight } = useBlocks();

  const isClosed = currentBlockHeight > endBlockHeight;
  const isOpen =
    currentBlockHeight <= endBlockHeight &&
    currentBlockHeight >= startBlockHeight;

  const statusBadge = (
    <>
      {!startBlockHeight ? (
        <Badge bg="base.800" color="secondary.900" size="sm" py="1" px="3">
          Inactive
        </Badge>
      ) : concluded ? (
        <Badge bg="base.800" color="secondary.900" size="sm" py="1" px="3">
          Executed
        </Badge>
      ) : isClosed ? (
        <Badge bg="base.800" color="secondary.900" size="sm" py="1" px="3">
          Ready to execute
        </Badge>
      ) : isOpen ? (
        <Badge bg="base.800" color="secondary.900" size="sm" py="1" px="3">
          Live
        </Badge>
      ) : (
        <Badge bg="base.800" color="secondary.900" size="sm" py="1" px="3">
          Pending
        </Badge>
      )}
    </>
  );

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.25, type: 'linear' }}
      whileHover={{
        scale: 1.015,
      }}
      whileTap={{
        scale: 1,
      }}
    >
      <Link href={`/proposals/${contractAddress}`}>
        <Card
          bg="base.900"
          minH="auto"
          position="relative"
          px={{ base: '6', md: '6' }}
          py={{ base: '6', md: '6' }}
          justifyContent="center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          _hover={{
            cursor: 'pointer',
          }}
        >
          <Stack w="full" direction="row" minH="15vh" justify="start">
            <Stack
              spacing="4"
              direction={{
                base: 'row',
                md: 'column',
              }}
              justify="space-between"
              color="white"
            >
              <HStack justify="space-between">
                {statusBadge}
                {isHovered && (
                  <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial={FADE_IN_VARIANTS.hidden}
                    animate={FADE_IN_VARIANTS.enter}
                    exit={FADE_IN_VARIANTS.exit}
                    transition={{ duration: 0.5, type: 'linear' }}
                  >
                    <Icon as={FiArrowUpRight} boxSize="5" color="light.900" />
                  </motion.div>
                )}
              </HStack>
              <Stack>
                <HStack spacing="3" justify="space-between">
                  <Stack direction="column" spacing="3">
                    <HStack align="center" spacing="2">
                      <Avatar
                        size={15}
                        variant="bauhaus"
                        colors={[
                          '#50DDC3',
                          '#624AF2',
                          '#EB00FF',
                          '#7301FA',
                          '#25C2A0',
                        ]}
                      />
                      <Text fontWeight="medium" fontSize="lg" lineHeight="1.15">
                        {title}
                      </Text>
                    </HStack>
                    <Text fontWeight="regular" fontSize="sm" color="gray.900">
                      {description && truncate(description, 50)}
                    </Text>
                  </Stack>
                </HStack>
                {/* <Stack direction='column' spacing='3'>
                    <Stack spacing='3' mt='2'>
                      <Text
                        color='gray.900'
                        fontSize='sm'
                        fontWeight='semibold'
                      >
                        Yes ({tokenToNumber(Number(votesFor), token?.decimals)})
                      </Text>
                      <Progress
                        colorScheme='secondary'
                        size='md'
                        value={getPercentage(totalVotes, Number(votesFor))}
                        bg='base.500'
                      />
                    </Stack>
                    <Stack spacing='3'>
                      <Text
                        color='gray.900'
                        fontSize='sm'
                        fontWeight='semibold'
                      >
                        No ({Number(votesAgainst)})
                      </Text>
                      <Progress
                        colorScheme='whiteAlpha'
                        size='md'
                        value={getPercentage(totalVotes, Number(votesAgainst))}
                        bg='base.500'
                      />
                    </Stack>
                  </Stack> */}
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Link>
    </motion.div>
  );
};
