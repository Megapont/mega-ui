import { Circle, Icon, SquareProps } from '@chakra-ui/react';
import { HiCheck } from 'react-icons/hi';

interface RadioCircleProps extends SquareProps {
  isCompleted: boolean;
  isActive: boolean;
}

export const StepCircle = (props: RadioCircleProps) => {
  const { isCompleted, isActive } = props;
  return (
    <Circle
      size="5"
      bg={isCompleted ? 'green' : 'inherit'}
      borderWidth={isCompleted ? '0' : '2px'}
      borderColor={isActive ? 'green' : 'base.500'}
      {...props}
    >
      {isCompleted ? (
        <Icon as={HiCheck} color="inverted" boxSize="4" />
      ) : (
        <Circle bg={isActive ? 'base.800' : 'base.800'} size="4" />
      )}
    </Circle>
  );
};
