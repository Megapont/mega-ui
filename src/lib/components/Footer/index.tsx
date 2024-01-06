/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FaDiscord, FaMedium, FaTwitter } from 'react-icons/fa';

export const AppFooter = () => {
  const year = new Date().getFullYear();
  return (
    <Box as="section" height="5vh">
      <Flex
        width="100%"
        justifyContent="center"
        align="center"
        flexDirection={'column'}
        position="fixed"
        bottom="0"
        p="3"
        gap={5}
        px="9"
      >
        <Flex width="100%" justifyContent="center">
          <Text color="base.500">Copyright © {year} megapont</Text>
        </Flex>
        <Flex width="100%" justifyContent="center" gap={5}>
          <IconButton
            variant="outline"
            borderRadius="50%"
            bgColor={'transparent'}
            colorScheme="base"
            aria-label={'discord'}
            icon={<FaDiscord></FaDiscord>}
          ></IconButton>
          <IconButton
            variant="outline"
            borderRadius="50%"
            bgColor={'transparent'}
            colorScheme="base"
            aria-label={'twitter'}
            icon={<FaTwitter></FaTwitter>}
          ></IconButton>
          <IconButton
            variant="outline"
            borderRadius="50%"
            bgColor={'transparent'}
            colorScheme="base"
            aria-label="medium"
            icon={<FaMedium></FaMedium>}
          ></IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};
