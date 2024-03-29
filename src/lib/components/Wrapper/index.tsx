/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Container, Stack } from '@chakra-ui/react';

export const Wrapper = ({ children }: any) => {
  return (
    <Container maxW="7xl" mb="5" mt="10">
      <Stack spacing={{ base: '8', lg: '6' }}>
        <Stack w="auto">
          <Container>{children}</Container>
        </Stack>
      </Stack>
    </Container>
  );
};
