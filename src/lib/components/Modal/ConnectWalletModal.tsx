'use client';

import type { ButtonProps, IconProps } from '@chakra-ui/react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { FADE_IN_VARIANTS } from '@lib/utils/animation';

const HiroIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 18" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.91266 18H5.91294H18.0864V0H5.91294H5.91266V0.000442038L0 9L5.91266 17.9995V18ZM16.3478 7.35641H13.7486L15.5739 4.5H14.194L11.9963 7.94584L9.80602 4.5H8.42614L10.2514 7.35641H7.65224V8.45968H16.3478V7.35641ZM18.087 18L24 9L18.087 0V18ZM13.6975 10.6058L15.5447 13.5H14.1647L11.9963 10.0995L9.82795 13.5H8.45534L10.3025 10.6134H7.65224V9.51763H16.3478V10.6058H13.6975Z"
    />
  </Icon>
);

const XverseIcon = (props: IconProps) => (
  <Icon viewBox="0 0 80 81" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.165 10.336c15.21-13.782 38.462-13.781 53.671.001l-3.96 3.96c-13.017-11.605-32.735-11.605-45.75 0l-3.96-3.961Zm56.5 2.829-3.96 3.961c11.603 13.016 11.603 32.733-.002 45.749l3.961 3.961c13.782-15.21 13.782-38.461 0-53.671ZM17.125 65.704c13.016 11.604 32.733 11.604 45.75-.001l3.96 3.961c-15.21 13.781-38.462 13.781-53.67 0l3.96-3.96Zm-2.829-2.829-3.96 3.961c-13.782-15.209-13.783-38.462 0-53.671l3.96 3.961c-11.605 13.016-11.605 32.733 0 45.749Zm50.631-39.577a30.178 30.178 0 0 0-3.714-4.51c-9.32-9.321-23.248-11.226-34.452-5.717l2.805 4.858c9.056-4.28 20.202-2.676 27.692 4.814a24.644 24.644 0 0 1 2.811 3.36l4.858-2.805Zm-2.856 6.268 4.858-2.805c5.51 11.205 3.605 25.133-5.716 34.453a30.15 30.15 0 0 1-4.512 3.715l-2.805-4.859a24.397 24.397 0 0 0 3.362-2.811c7.49-7.49 9.094-18.636 4.813-27.693ZM50.435 62.073c-9.057 4.28-20.203 2.676-27.692-4.814a24.524 24.524 0 0 1-2.812-3.362l-4.859 2.804a30.114 30.114 0 0 0 3.716 4.513c9.32 9.321 23.247 11.226 34.451 5.717l-2.804-4.858ZM13.07 53.239l4.86-2.805c-4.28-9.057-2.677-20.202 4.813-27.691a24.448 24.448 0 0 1 3.361-2.811L23.3 15.073a30.142 30.142 0 0 0-4.51 3.715c-9.32 9.32-11.227 23.246-5.719 34.451Zm41.072-27.381a19.906 19.906 0 0 1 5.51 10.415l-5.61.491a14.339 14.339 0 0 0-3.855-6.951 14.354 14.354 0 0 0-9.438-4.201l-.49-5.61a19.93 19.93 0 0 1 13.883 5.856Zm-17.869-5.51a19.906 19.906 0 0 0-10.415 5.51 19.931 19.931 0 0 0-5.856 13.883l5.611-.49a14.35 14.35 0 0 1 4.2-9.438 14.339 14.339 0 0 1 6.951-3.854l-.49-5.611ZM20.348 43.726a19.908 19.908 0 0 0 5.51 10.416 19.935 19.935 0 0 0 13.884 5.856l-.49-5.611a14.346 14.346 0 0 1-9.439-4.2 14.337 14.337 0 0 1-3.854-6.952l-5.61.491Zm33.794 10.416a19.91 19.91 0 0 1-10.415 5.51l-.49-5.611a14.339 14.339 0 0 0 6.95-3.854 14.352 14.352 0 0 0 4.201-9.438l5.61-.491a19.93 19.93 0 0 1-5.856 13.884Z"
    />
  </Icon>
);

export const ConnectWalletModal = (props: ButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isClient && (
        <>
          <Button {...props} onClick={onOpen}>
            Connect
          </Button>
          <Modal
            blockScrollOnMount
            isCentered
            closeOnOverlayClick
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent
              bg="base.900"
              borderColor="base.500"
              borderWidth="1px"
              color="light.900"
              py="8"
              px="8"
            >
              <motion.div
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.75, type: 'linear' }}
              >
                <Stack
                  spacing="2"
                  mb="6"
                  direction={{ base: 'column', md: 'row' }}
                  justify="flex-start"
                  color="white"
                >
                  <VStack maxW="xl" spacing="2" align="flex-start">
                    <Heading size="sm" fontWeight="light" color="light.900">
                      Connect your wallet
                    </Heading>
                    <HStack spacing="3">
                      <Stack spacing="2" direction="row">
                        <Text
                          color="gray.900"
                          fontSize="sm"
                          fontWeight="regular"
                        >
                          You need a wallet to use StackerDAOs. A wallet gives
                          you the ability to interact with the StackerDAO
                          protocol, like submitting proposals and voting.
                        </Text>
                      </Stack>
                    </HStack>
                  </VStack>
                </Stack>
                <motion.div
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 0.25, type: 'linear' }}
                >
                  <Stack w="auto" spacing="3">
                    <a
                      href="https://chrome.google.com/webstore/detail/hiro-wallet/ldinpeekobnhjjdofggfgjlcehhmanlj"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Stack
                        px="3"
                        py="3"
                        bg="base.900"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="base.500"
                        _hover={{ bg: 'base.800' }}
                      >
                        <HStack justify="space-between">
                          <HStack spacing="6">
                            <HiroIcon h="12" w="12" />
                            <Stack spacing="0">
                              <Text color="light.900">Hiro wallet</Text>
                              <Text color="gray.900" size="xs">
                                Browser extension for Chrome
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
                            />
                          </Stack>
                        </HStack>
                      </Stack>
                    </a>
                    <a
                      href="https://www.xverse.app/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Stack
                        px="3"
                        py="3"
                        bg="base.900"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="base.500"
                        _hover={{ bg: 'base.800' }}
                      >
                        <HStack justify="space-between">
                          <HStack spacing="6">
                            <XverseIcon h="12" w="12" />
                            <Stack spacing="0">
                              <Text color="light.900">Xverse wallet</Text>
                              <Text color="gray.900" size="xs">
                                Mobile browser for Stacks
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
                            />
                          </Stack>
                        </HStack>
                      </Stack>
                    </a>
                  </Stack>
                </motion.div>
              </motion.div>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};
