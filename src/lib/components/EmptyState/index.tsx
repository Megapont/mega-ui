/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Button, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const EmptyState = ({
  heading,
  linkTo,
  buttonTitle,
  isDisabled,
}: any) => {
  return (
    <Stack spacing="3" m="6" alignItems="center" color="white">
      <Text fontSize="lg" fontWeight="medium">
        {heading}
      </Text>
      {buttonTitle ? (
        <Link href={linkTo}>
          {isDisabled ? (
            <Button
              my="10"
              py="4"
              color="white"
              bg="secondary.900"
              size="sm"
              disabled
              _disabled={{
                bg: 'secondary.900',
                opacity: 0.5,
                cursor: 'not-allowed',
                _hover: {
                  bg: 'secondary.900',
                  opacity: 0.5,
                  cursor: 'not-allowed',
                },
              }}
              _hover={{ opacity: 0.9 }}
              _active={{ opacity: 1 }}
            >
              {buttonTitle}
            </Button>
          ) : (
            <Button
              my="10"
              py="4"
              color="white"
              bg="secondary.900"
              size="sm"
              _hover={{ opacity: 0.9 }}
              _active={{ opacity: 1 }}
            >
              {buttonTitle}
            </Button>
          )}
        </Link>
      ) : null}
    </Stack>
  );
};
