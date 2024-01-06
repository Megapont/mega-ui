'use client';

import { BoxProps, Divider, Stack, Text } from '@chakra-ui/react';
import { StepCircle } from '@lib/components/StepCircle';

interface StepProps extends BoxProps {
  title: string;
  description?: any;
  isCompleted: boolean;
  isActive: boolean;
  isLastStep: boolean;
  payload?: any;
}

export const VerticalStep = (props: StepProps) => {
  const {
    isActive,
    isCompleted,
    isLastStep,
    title,
    description,
    ...stackProps
  } = props;

  return (
    <Stack spacing="4" direction="row" {...stackProps}>
      <Stack spacing="0" align="center" height={'10vh'}>
        <StepCircle isActive={isActive} isCompleted={isCompleted} />
        <Divider
          orientation="vertical"
          borderWidth="1px"
          borderColor={
            isCompleted ? 'base.500' : isLastStep ? 'transparent' : 'base.500'
          }
        />
      </Stack>
      <Stack spacing="2" pb={isLastStep ? '0' : isCompleted ? '3' : '8'}>
        <Text color="light.900" fontSize="md" fontWeight="regular">
          {title}
        </Text>
        {description}
      </Stack>
    </Stack>
  );
};
