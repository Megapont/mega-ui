/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  Box,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAuth, useAccount } from '@micro-stacks/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { truncate } from '@common/helpers';
import { EmptyState } from '@lib/components/EmptyState';
import { SectionHeader } from '@lib/components/SectionHeader';
import { WalletConnectButton } from '@lib/components/WalletConnectButton';
import { Wrapper } from '@lib/components/Wrapper';
import { supabase } from '@lib/utils/supabase';

const SLIDE_UP_VARIANTS = {
  hidden: { opacity: 0, x: 0, y: 15 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -15 },
};

type TProjectsTable = {
  isLoading: boolean;
  projects: any[];
};

const initialState = {
  isLoading: true,
  projects: [],
};

export default function Index() {
  const { isSignedIn } = useAuth();
  const { stxAddress } = useAccount();
  const [state, setState] = useState<TProjectsTable>(initialState);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data: Organizations, error } = await supabase
          .from('Organizations')
          .select('id, name, slug, contractAddress');
        if (error) throw Error(error.message);
        if (Organizations.length > 0) {
          const projects = Organizations;
          setState({ ...state, isLoading: false, projects });
        }
      } catch (e: any) {
        throw Error(e.message);
      }
    };
    fetchProjects();
  }, [state, stxAddress]);

  if (state.isLoading) {
    return null;
  }

  if (state.projects.length === 0) {
    return <EmptyState heading="No projects found" />;
  }

  return (
    <Box as="section">
      <motion.div
        variants={SLIDE_UP_VARIANTS}
        initial={SLIDE_UP_VARIANTS.hidden}
        animate={SLIDE_UP_VARIANTS.enter}
        exit={SLIDE_UP_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Box
          as="section"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Wrapper>
            {isSignedIn ? (
              <>
                <Stack
                  spacing={{ base: '8', md: '10' }}
                  align="center"
                  maxW="3xl"
                  mx="auto"
                >
                  <Box textAlign="center" maxW="900px">
                    <Heading
                      as="h1"
                      size="xl"
                      fontWeight="extrabold"
                      maxW="48rem"
                      mx="auto"
                      lineHeight="1.2"
                      letterSpacing="tight"
                      color="light.900"
                    >
                      Bitcoin
                      <Text
                        as="span"
                        pr="2"
                        maxW="xl"
                        mx="auto"
                        color="light.900"
                        bgGradient="linear(to-br, secondary.900, secondaryGradient.900)"
                        bgClip="text"
                        fontStyle="italic"
                      >
                        DAOs
                      </Text>
                    </Heading>
                    <Text
                      mt="4"
                      p="4"
                      maxW="xl"
                      mx="auto"
                      fontSize="lg"
                      color="gray.900"
                    >
                      One-stop shop to create and manage DAOs secured by Bitcoin
                      via Stacks.
                    </Text>
                  </Box>
                </Stack>
                <SectionHeader
                  justify="flex-start"
                  align="center"
                  color="white"
                >
                  <Box>
                    <Text size="lg" fontWeight="regular">
                      Featured projects
                    </Text>
                  </Box>
                </SectionHeader>
                <Stack spacing="3">
                  {state?.projects?.map((project) => (
                    <Link key={project.name} href={`/d/${project.slug}`}>
                      <Stack
                        cursor="pointer"
                        px="6"
                        py="3"
                        bg="base.900"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="base.500"
                        _hover={{ bg: 'base.800' }}
                      >
                        <HStack justify="space-between">
                          <HStack spacing="6">
                            <Stack spacing="0">
                              <Text color="light.900">{project.name}</Text>
                              <Text color="gray.900" size="xs">
                                {truncate(project.contractAddress, 4, 14)}
                              </Text>
                            </Stack>
                          </HStack>
                          <Stack>
                            <IconButton
                              icon={<FaArrowRight fontSize="0.75em" />}
                              bg="none"
                              color="light.900"
                              size="md"
                              aria-label="Transfer"
                              _active={{ bg: 'none' }}
                              _hover={{ bg: 'none' }}
                            />
                          </Stack>
                        </HStack>
                      </Stack>
                    </Link>
                  ))}
                </Stack>
              </>
            ) : (
              <Stack
                spacing={{ base: '8', md: '10' }}
                align="center"
                justify="center"
                minH="xl"
                maxW="3xl"
                mx="auto"
              >
                <Box textAlign="center" maxW="900px">
                  <Heading
                    as="h1"
                    size="xl"
                    fontWeight="extrabold"
                    maxW="48rem"
                    mx="auto"
                    lineHeight="1.2"
                    letterSpacing="tight"
                    color="light.900"
                  >
                    DAOs on
                    <Text
                      as="span"
                      pr="2"
                      maxW="xl"
                      mx="auto"
                      color="light.900"
                      bgGradient="linear(to-br, secondary.900, secondaryGradient.900)"
                      bgClip="text"
                      fontStyle="italic"
                    >
                      Bitcoin
                    </Text>
                  </Heading>
                  <Text
                    p="4"
                    maxW="xl"
                    mx="auto"
                    fontSize="lg"
                    color="gray.900"
                  >
                    One-stop shop to create and manage DAOs secured by Bitcoin
                    via Stacks.
                  </Text>
                  <Stack
                    direction="row"
                    spacing={4}
                    align="center"
                    justify="center"
                  >
                    <motion.div
                      variants={SLIDE_UP_VARIANTS}
                      initial={SLIDE_UP_VARIANTS.hidden}
                      animate={SLIDE_UP_VARIANTS.enter}
                      exit={SLIDE_UP_VARIANTS.exit}
                      transition={{ duration: 0.8, type: 'linear' }}
                    >
                      <Stack>
                        <WalletConnectButton
                          p="6"
                          size="md"
                          color="base.900"
                          fontWeight="medium"
                          bg="light.900"
                          _hover={{ opacity: 0.9 }}
                          _active={{ opacity: 1 }}
                        />
                      </Stack>
                    </motion.div>
                  </Stack>
                </Box>
              </Stack>
            )}
          </Wrapper>
        </Box>
      </motion.div>
    </Box>
  );
}
