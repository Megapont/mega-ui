/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Flex, Image, Text, IconButton, Box, Link } from '@chakra-ui/react';
import { FaDiscord, FaTwitter, FaMedium } from 'react-icons/fa';

export const AppFooter = () => {
  const year = new Date().getFullYear();
  return (
    <Box as="section" height="5vh">
      <Flex
        width="100%"
        justifyContent="center"
        align="center"
        position="fixed"
        bottom="0"
        p="3"
        px="9"
      >
        <Flex width="33.333333%" justifyContent="start">
          <Link href="/">
            <Flex justify="center" align="center" gap="2">
              <Image
                cursor="pointer"
                height="35px"
                src="/megapont-logo.svg"
                alt="logo"
              />
              <Text fontSize="4xl" className="lisbeth-dao-text">
                DAO
              </Text>
            </Flex>
          </Link>
        </Flex>
        <Flex width="33.333333%" justifyContent="center">
          <Text color="base.500">Copyright © {year} megapont</Text>
        </Flex>
        <Flex width="33.333333%" justifyContent="end" gap={5}>
          <IconButton
            variant="outline"
            borderRadius="50%"
            borderColor="white"
            bgColor={'base.800'}
            aria-label={'discord'}
            icon={<FaDiscord></FaDiscord>}
          ></IconButton>
          <IconButton
            variant="outline"
            borderRadius="50%"
            borderColor="white"
            bgColor={'base.800'}
            aria-label={'twitter'}
            icon={<FaTwitter></FaTwitter>}
          ></IconButton>
          <IconButton
            variant="outline"
            borderRadius="50%"
            borderColor="white"
            bgColor={'base.800'}
            aria-label="medium"
            icon={<FaMedium></FaMedium>}
          ></IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};
