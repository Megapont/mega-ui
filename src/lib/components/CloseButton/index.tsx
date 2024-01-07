import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { HiX } from 'react-icons/hi';

export const CloseButton = (props: IconButtonProps) => (
  <IconButton
    fontSize="lg"
    variant="ghost"
    icon={<HiX />}
    _hover={{ bg: 'base.900' }}
    {...props}
  />
);
