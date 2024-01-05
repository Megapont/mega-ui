/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */

'use client';

import type { ButtonProps } from '@chakra-ui/react';
import { Button, Text } from '@chakra-ui/react';
// Components
import { useAuth, useNetwork } from '@micro-stacks/react';
import { StacksMainnet, StacksMocknet } from 'micro-stacks/network';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { devnet } from '@common/constants';
import { ConnectWalletModal } from '@lib/components/Modal/ConnectWalletModal';

export const WalletConnectButton = (props: ButtonProps) => {
  const [installed, setInstalled] = useState(false);
  const { isSignedIn, openAuthRequest, signOut, isRequestPending } = useAuth();
  const router = useRouter();
  const { setNetwork } = useNetwork();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setNetwork(devnet ? new StacksMocknet() : new StacksMainnet());
  }, [isSignedIn, setNetwork]);

  useEffect(() => {
    setTimeout(() => {
      if (window?.StacksProvider) {
        setInstalled(true);
      }
    }, 500);
  }, [installed]);

  function handleClick() {
    if (isSignedIn) {
      signOut();
      localStorage.setItem('chakra-ui-color-mode', 'dark');
      router.push('/');
    } else {
      openAuthRequest();
    }
  }

  if (installed) {
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {isClient && (
          <Button {...props} onClick={handleClick}>
            {isRequestPending ? (
              'Loading...'
            ) : isSignedIn ? (
              <Text isTruncated>Disconnect</Text>
            ) : (
              'Connect'
            )}
          </Button>
        )}
      </>
    );
  }

  return <ConnectWalletModal {...props} />;
};
