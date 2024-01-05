'use client';

import { Stack } from '@chakra-ui/react';
import type { StackProps } from '@chakra-ui/react';

export const SectionHeader = (props: StackProps) => {
  return (
    <Stack
      spacing="4"
      mt="6"
      mb="3"
      direction={{ base: 'column', md: 'row' }}
      {...props}
    />
  );
};
