'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ClientProvider } from '@micro-stacks/react';
import { StacksMocknet } from 'micro-stacks/network';

import { devnet, appDetails } from '@lib/common/constants';
import { Chakra as ChakraProvider } from '@lib/components/Chakra';

const network = new StacksMocknet();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientProvider
      enableNetworkSwitching
      appName={appDetails.name}
      appIconUrl={appDetails.icon}
      network={devnet ? network : 'mainnet'}
    >
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </ClientProvider>
  );
};

export default Providers;
