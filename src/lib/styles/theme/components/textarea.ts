import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { transparentize } from '@chakra-ui/theme-tools';

const variants = {
  outline: (props: StyleFunctionProps) => ({
    borderRadius: 'lg',
    bg: 'base.900',
    _hover: { borderColor: 'base.500' },
    _focus: {
      borderColor: 'base.500',
      boxShadow: `0px 0px 0px 1px ${transparentize(
        `secondary.900`,
        1.0
      )(props.theme)}`,
    },
  }),
};

export default {
  variants,
};
