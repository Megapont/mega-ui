'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ClientProvider } from '@micro-stacks/react';
import { StacksTestnet } from 'micro-stacks/network';

import { devnet, appDetails } from '@lib/common/constants';
import { Chakra as ChakraProvider } from '@lib/components/Chakra';
import { QueryClient, QueryClientProvider } from 'react-query';

const network = new StacksTestnet();
const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default Providers;
