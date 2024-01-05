const variants = {
  accent: () => ({
    container: {
      bg: 'base.900',
      borderTopColor: 'primaryGradient.900',
      color: 'white',
    },
  }),
  primary: () => ({
    container: {
      bgGradient: 'linear(to-br, primaryGradient.900, primary.900)',
    },
  }),
};

const defaultProps = {
  colorScheme: 'brand',
};

export default {
  variants,
  defaultProps,
};
