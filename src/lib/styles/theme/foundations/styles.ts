export default {
  global: () => ({
    body: {
      color: 'default',
      bg: 'base.900',
    },
    '*::placeholder': {
      opacity: 1,
      color: 'subtle',
    },
    '*, *::before, &::after': {
      borderColor: 'base.500',
    },
    code: {
      color: 'light.900',
      bg: 'base.900',
    },
  }),
};
