import {
  Container,
  Heading,
  HStack,
  Stack,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  useDAO,
  useToken,
  useTokenBalance,
  useProposals,
} from '@common/queries';
import { EmptyState } from '@lib/components/EmptyState';
import { Stat } from '@lib/components/Stat';
import Avatar from 'boring-avatars';
import { motion } from 'framer-motion';
import { defaultTo } from 'lodash';
import Link from 'next/link';

import { ustxToStx, convertToken } from '@common/helpers';
import { FADE_IN_VARIANTS } from '@utils/animation';

export const Header = () => {
  const { dao } = useDAO();
  const { data } = useProposals();
  const { dao: DAO } = useDAO();
  const { isLoading, isIdle, isError, token, balance } = useToken();
  const { balance: userBalance } = useTokenBalance();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const Vault = () => {
    const stx = balance?.stx;
    const amount = defaultTo(stx?.balance, 0);
    const stxBalance = ustxToStx(amount);
    return (
      <Stat
        flex="1"
        borderRadius="lg"
        label="Vault"
        value={stxBalance}
        info="Total STX"
        path="vault"
      />
    );
  };

  const Proposals = () => {
    const proposalSize = defaultTo(data?.length, 0);
    return (
      <Stat
        flex="1"
        borderRadius="lg"
        label="Proposals"
        value={proposalSize}
        info="Total"
        path="proposals"
      />
    );
  };

  const Governance = () => {
    const balance = defaultTo(userBalance, 0);
    const decimals = defaultTo(token?.decimals, 0);
    const tokenBalance = defaultTo(
      convertToken(balance?.toString(), decimals),
      0
    );
    return (
      <Stat
        flex="1"
        borderRadius="lg"
        label="Governance"
        value={tokenBalance} // TODO: Get decimals for token
        info={defaultTo(token?.symbol, 'Token')}
        path="governance"
      />
    );
  };

  if (isError) {
    return (
      <EmptyState
        heading="Unable to load balance"
        linkTo={`/d/${dao}/proposals/create/transfer`}
        buttonTitle="Try again"
      />
    );
  }

  if (isLoading || isIdle) {
    <Container maxW="5xl">
      <Stack spacing={{ base: '6', lg: '4' }} mt="5">
        <Container>
          <Stack
            spacing="2"
            mt="4"
            mb="2"
            direction={{ base: 'column', md: 'row' }}
            justify="flex-start"
            color="white"
          >
            <VStack maxW="xl" spacing="3">
              <Link href={`/d/${dao}`}>
                <a>
                  <HStack align="baseline">
                    <Avatar
                      size={40}
                      name={DAO?.name}
                      variant="marble"
                      colors={[
                        '#50DDC3',
                        '#624AF2',
                        '#EB00FF',
                        '#7301FA',
                        '#25C2A0',
                      ]}
                    />
                    <Heading
                      size="lg"
                      pb="2"
                      fontWeight="light"
                      color="light.900"
                    >
                      {DAO?.name}
                    </Heading>
                  </HStack>
                </a>
              </Link>
            </VStack>
          </Stack>
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
              <EmptyState heading="Fetching vault data..." />
            </Stack>
          </motion.div>
        </Container>
      </Stack>
    </Container>;
  }

  return (
    <Container maxW="5xl">
      <Stack spacing={{ base: '6', lg: '4' }} mt="5">
        <Container>
          <Stack
            spacing="2"
            mt="4"
            mb="2"
            direction={{ base: 'column', md: 'row' }}
            justify="flex-start"
            color="white"
          >
            <VStack maxW="xl" spacing="3">
              <Link href={`/d/${dao}`}>
                <a>
                  <HStack align="baseline">
                    <Avatar
                      size={40}
                      name={DAO?.name}
                      variant="marble"
                      colors={[
                        '#50DDC3',
                        '#624AF2',
                        '#EB00FF',
                        '#7301FA',
                        '#25C2A0',
                      ]}
                    />
                    <Heading
                      size="lg"
                      pb="2"
                      fontWeight="light"
                      color="light.900"
                    >
                      {DAO?.name}
                    </Heading>
                  </HStack>
                </a>
              </Link>
            </VStack>
          </Stack>
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
              <Vault />
              <Proposals />
              <Governance />
            </Stack>
          </motion.div>
        </Container>
      </Stack>
    </Container>
  );
};
