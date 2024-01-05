/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  Box,
  ButtonGroup,
  Flex,
  HStack,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useAccount, useAuth, useNetwork } from '@micro-stacks/react';
import Avatar from 'boring-avatars';
import { fetchAccountStxBalance, fetchNamesByAddress } from 'micro-stacks/api';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

import { ustxToStx } from '@common/helpers';
import { Card } from '@lib/components/Card';
import { WalletConnectButton } from '@lib/components/WalletConnectButton';

export const MainNavbar = () => {
  const { network } = useNetwork();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bns, setBns] = useState<string | undefined>('');
  const [balance, setBalance] = useState<string | undefined>('');
  const { stxAddress }: any = useAccount();
  const { isSignedIn, openAuthRequest, signOut } = useAuth();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  // const NETWORK_CHAIN_ID: any = {
  //   1: 'Mainnet',
  //   2147483648: network.bnsLookupUrl?.includes('testnet')
  //     ? 'Testnet'
  //     : 'Devnet',
  // };
  const switchAccount = () => {
    openAuthRequest();
  };
  const handleSignOut = () => {
    signOut();
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  };

  useEffect(() => {
    async function fetch() {
      if (isSignedIn && stxAddress) {
        const stxBalance = await fetchAccountStxBalance({
          url: network.getCoreApiUrl(),
          principal: stxAddress || '',
        });
        setBalance(ustxToStx(stxBalance?.balance?.toString() || '0'));
        const data = await fetchNamesByAddress({
          url: network.getCoreApiUrl(),
          blockchain: 'stacks',
          address: stxAddress || '',
        });
        const { names } = data;
        if (names?.length > 0) {
          setBns(names[0]);
        }
      }
    }
    fetch();
  }, [stxAddress, network, isSignedIn]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box as="section" height="5vh">
      <Box
        as="nav"
        position="fixed"
        w="100%"
        p="3"
        px="9"
        bg="base.900"
        borderBottom="1px solid"
        borderColor="base.800"
        zIndex="2"
      >
        <HStack
          justify={isMobile ? 'space-between' : 'space-around'}
          spacing="2"
        >
          <Link href="/">
            <Image
              cursor="pointer"
              height="35px"
              src="/img/logo-with-name.png"
              alt="logo"
            />
          </Link>
          {isDesktop ? (
            <Flex justify="flex-end" flex="1">
              <HStack spacing="3">
                <ButtonGroup spacing="6" alignItems="center">
                  {isSignedIn ? (
                    <HStack cursor="pointer" spacing="5" color="light.900">
                      <HStack spacing="1">
                        <Text
                          as="span"
                          fontSize="sm"
                          fontWeight="regular"
                          color="light.900"
                        >
                          Ӿ
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="light.900"
                        >
                          {balance}{' '}
                        </Text>
                      </HStack>
                      <HStack spacing="1">
                        <Avatar
                          size={15}
                          name={stxAddress}
                          variant="beam"
                          colors={[
                            '#50DDC3',
                            '#624AF2',
                            '#EB00FF',
                            '#7301FA',
                            '#25C2A0',
                          ]}
                        />
                      </HStack>
                    </HStack>
                  ) : null}
                  {stxAddress && (
                    <Popover
                      trigger="click"
                      openDelay={0}
                      placement="bottom-start"
                      defaultIsOpen={false}
                    >
                      {() => (
                        <>
                          <PopoverTrigger>
                            <HStack>
                              <FaEllipsisH color="white" cursor="pointer" />
                            </HStack>
                          </PopoverTrigger>
                          <PopoverContent
                            borderColor="base.500"
                            _focus={{ outline: 'none' }}
                            bg="base.900"
                            w="auto"
                            my="2"
                          >
                            <SimpleGrid columns={{ base: 1 }}>
                              <Stack spacing="4" direction="row" p="3">
                                <Stack spacing="1">
                                  <Card
                                    bg="transparent"
                                    border="none"
                                    minW="150px"
                                    px={{ base: '2', md: '2' }}
                                    py={{ base: '2', md: '2' }}
                                    _hover={{
                                      cursor: 'pointer',
                                      bg: 'base.900',
                                    }}
                                  >
                                    <HStack>
                                      <Text
                                        px="2"
                                        fontSize="sm"
                                        fontWeight="regular"
                                        color="white"
                                        onClick={switchAccount}
                                      >
                                        Switch account
                                      </Text>
                                    </HStack>
                                  </Card>
                                  <Card
                                    bg="transparent"
                                    border="none"
                                    minW="150px"
                                    px={{ base: '2', md: '2' }}
                                    py={{ base: '2', md: '2' }}
                                    _hover={{
                                      cursor: 'pointer',
                                      bg: 'base.900',
                                    }}
                                  >
                                    <HStack>
                                      <Text
                                        px="2"
                                        fontSize="sm"
                                        fontWeight="regular"
                                        color="white"
                                        onClick={handleSignOut}
                                      >
                                        Disconnect
                                      </Text>
                                    </HStack>
                                  </Card>
                                </Stack>
                              </Stack>
                            </SimpleGrid>
                          </PopoverContent>
                        </>
                      )}
                    </Popover>
                  )}
                  {!stxAddress && (
                    <WalletConnectButton
                      color="base.900"
                      size="sm"
                      fontWeight="medium"
                      bg="light.900"
                      _hover={{ opacity: 0.9 }}
                      _active={{ opacity: 1 }}
                    />
                  )}
                </ButtonGroup>
              </HStack>
            </Flex>
          ) : (
            stxAddress && (
              <WalletConnectButton
                color="base.900"
                size="sm"
                fontWeight="medium"
                bg="light.900"
                _hover={{ opacity: 0.9 }}
                _active={{ opacity: 1 }}
              />
            )
          )}
        </HStack>
      </Box>
    </Box>
  );
};
