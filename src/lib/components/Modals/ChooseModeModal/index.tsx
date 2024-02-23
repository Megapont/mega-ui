'use client';
import {
  Box,
  Button,
  CloseButton,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  //   ModalHeader,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '@lib/common/queries';
import { useRouter } from 'next/navigation';
import { Notification } from '@lib/components/Notification';
import { useCallback, useState } from 'react';
import { FaCode, FaFileAlt, FaPlusCircle } from 'react-icons/fa';

export const ChooseModeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { proposeData } = useAuth();
  const toast = useToast();
  const [selectedMode, setSelectedMode] = useState('standard');

  const cannotPropose = useCallback(() => {
    toast({
      duration: 3500,
      isClosable: true,
      position: 'bottom-right',
      render: () => (
        <Notification>
          <Stack direction="row" p="4" spacing="3">
            <Stack spacing="2.5">
              <Stack spacing="1">
                <Text fontSize="md" color="light.900" fontWeight="medium">
                  You cannot propose
                </Text>
                <Text fontSize="sm" color="gray.900">
                  You dont have enough MEGA token balance to initiate a
                  proposal.
                </Text>
              </Stack>
            </Stack>
            <CloseButton
              aria-label="close"
              transform="translateY(-6px)"
              color="white"
              onClick={() => toast.closeAll()}
            />
          </Stack>
        </Notification>
      ),
    });
  }, [toast]);

  return (
    <>
      <FaPlusCircle
        onClick={() => {
          if (!proposeData?.canPropose) {
            cannotPropose();
            return;
          }
          onOpen();
        }}
      ></FaPlusCircle>

      <Modal
        blockScrollOnMount={true}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent bg="base.900" color="light.900" p={10}>
          <ModalBody>
            <Stack spacing={4} align="center">
              <HStack spacing={{ base: 2, md: 10 }} justify="center">
                <Box
                  as="button"
                  p={5}
                  borderWidth="1px"
                  borderRadius="lg"
                  w={{ base: '90%', sm: '45%', md: 150 }}
                  h={{ base: 'auto', md: 150 }}
                  boxShadow={
                    selectedMode === 'standard' ? '0 0 8px 2px #624AF2' : 'none'
                  }
                  onClick={() => setSelectedMode('standard')}
                >
                  <Icon as={FaFileAlt} color="secondary.900" boxSize={6} />
                  <Box p={2}>
                    <Text fontSize="md" fontWeight="medium" color="white">
                      Standard
                    </Text>
                  </Box>
                </Box>
                <Box
                  as="button"
                  p={5}
                  borderWidth="1px"
                  borderRadius="lg"
                  w={{ base: '90%', sm: '45%', md: 150 }}
                  h={{ base: 'auto', md: 150 }}
                  boxShadow={
                    selectedMode === 'advanced' ? '0 0 8px 2px #624AF2' : 'none'
                  }
                  onClick={() => setSelectedMode('advanced')}
                >
                  <Icon as={FaCode} color="secondary.900" boxSize={6} />
                  <Box p={2}>
                    <Text fontSize="md" fontWeight="medium" color="white">
                      Advanced
                    </Text>
                  </Box>
                </Box>
              </HStack>
              <Text mt={2} fontSize={'sm'}>
                {selectedMode == 'standard'
                  ? 'Submit a proposal without writing any code, best suitable for simple text proposals'
                  : 'Complete control over contract code, requires clarity smart contract language knowledge'}
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="secondary.900"
              bg="secondary.900"
              textColor={'white'}
              onClick={() => router.push(`/proposals/create/${selectedMode}`)}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
