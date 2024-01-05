'use client';

import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export const Card = (props: BoxProps) => (
  <Box
    minH="35"
    bg="base.700"
    borderRadius="lg"
    border="1px solid"
    borderColor="base.500"
    {...props}
  />
);
