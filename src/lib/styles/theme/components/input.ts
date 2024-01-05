/* eslint-disable sonarjs/no-duplicate-string */
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { mode, transparentize } from '@chakra-ui/theme-tools';

const variants = {
  outline: (props: StyleFunctionProps) => ({
    field: {
      borderRadius: 'lg',
      bg: 'base.900',
      _hover: { borderColor: mode('gray.300', 'gray.600')(props) },
      _focus: {
        borderColor: 'base.800',
        boxShadow: `0px 0px 0px 1px ${transparentize(
          `secondary.900`,
          1.0
        )(props.theme)}`,
      },
    },
    addon: {
      borderRadius: 'lg',
      bg: mode('gray.50', 'gray.700')(props),
    },
  }),
  'outline-on-accent': (props: StyleFunctionProps) => ({
    field: {
      bg: 'white',
      borderRadius: 'lg',
      color: 'gray.900',
      borderWidth: '1px',
      borderColor: 'brand.50',
      _placeholder: {
        color: 'gray.500',
      },
      _hover: {
        borderColor: 'brand.100',
      },
      _focus: {
        borderColor: 'brand.200',
        boxShadow: `0px 0px 0px 1px ${transparentize(
          `brand.200`,
          1.0
        )(props.theme)}`,
      },
    },
  }),
  filled: (props: StyleFunctionProps) => {
    if (props.colorScheme === 'gray') {
      return {
        field: {
          bg: mode('white', 'gray.800')(props),
          _hover: {
            borderColor: mode('gray.200', 'gray.700')(props),
            bg: mode('white', 'gray.700')(props),
          },
          _focus: {
            borderColor: 'accent',
            bg: mode('white', 'gray.800')(props),
          },
        },
      };
    }
    return {
      field: {
        bg: 'bg-accent-subtle',
        color: 'light.900',
        _placeholder: {
          color: 'on-accent',
        },
        _hover: {
          borderColor: 'brand.400',
          bg: 'bg-accent-subtle',
        },
        _focus: {
          bg: 'bg-accent-subtle',
          borderColor: 'brand.300',
        },
      },
    };
  },
};

export default {
  variants,
  defaultProps: {
    colorScheme: 'gray',
  },
};
