import { Box, Flex, FlexProps } from '@chakra-ui/react';

export const Notification = (props: FlexProps) => {
  const { children, ...flexProps } = props;
  return (
    <Flex direction="row-reverse">
      <Box bg="base.800" borderRadius="lg" {...flexProps}>
        {children}
      </Box>
    </Flex>
  );
};
