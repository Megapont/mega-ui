import { Container, Stack, useBreakpointValue } from '@chakra-ui/react';
import { useProposals, useToken, useTokenBalance } from '@common/queries';
import { EmptyState } from '@lib/components/EmptyState';
import { Stat } from '@lib/components/Stat';
import { motion } from 'framer-motion';
import { defaultTo } from 'lodash';

import { convertToken, ustxToStx } from '@common/helpers';
import { FADE_IN_VARIANTS } from '@utils/animation';

export const Header = () => {
  const { data } = useProposals();
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
    return (
      <Stat
        flex="1"
        borderRadius="lg"
        label="Governance"
        value={balance}
        info={defaultTo(token?.symbol || 'MEGA', 'Token')}
        path="governance"
      />
    );
  };

  if (isError) {
    return (
      <EmptyState
        heading="Unable to load balance"
        linkTo={`/d/proposals/create/transfer`}
        buttonTitle="Try again"
      />
    );
  }

  if (isLoading || isIdle) {
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
              <EmptyState heading="Fetching vault data..." />
            </Stack>
          </motion.div>
        </Container>
      </Stack>
    </Container>;
  }

  return (
    <Container maxW="5xl">
      <Stack spacing={{ base: '6', lg: '4' }} mt="20">
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
