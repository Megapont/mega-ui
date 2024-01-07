import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  VStack,
  ModalBody,
  Stack,
} from '@chakra-ui/react';

// Web3
import { useAccount } from '@micro-stacks/react';

// Components
import { DepositButton } from '@lib/components/Actions/DepositButton';

// Utils
import { adminAddress } from '@common/constants';
import { DevToolModal } from '@lib/components/Modals/DevToolModal';

export const AppFooter = () => {
  const [depositAmount, setDepositAmount] = useState('');

  const { stxAddress } = useAccount();
  if (stxAddress === adminAddress) {
    return (
      <Box as="section">
        <Box
          as="nav"
          position="fixed"
          bottom="0"
          py="3"
          px="8"
          w="100%"
          bg="transparent"
          zIndex="9999"
        >
          <HStack justify="space-between" flex="1">
            <HStack spacing="2">
              <DevToolModal title="Dev Tools">
                <ModalBody pb={6}>
                  <Stack spacing="3">
                    <VStack spacing="2" align="flex-start">
                      <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <Input
                          id="depositAmount"
                          type="number"
                          bg="base.800"
                          borderColor="base.500"
                          autoComplete="off"
                          placeholder="100 STX"
                          onInput={(e: any) => setDepositAmount(e.target.value)}
                        />
                      </FormControl>
                      <DepositButton title="Deposit" amount={depositAmount} />
                    </VStack>
                  </Stack>
                </ModalBody>
              </DevToolModal>
            </HStack>
          </HStack>
        </Box>
      </Box>
    );
  }
  return null;
};
