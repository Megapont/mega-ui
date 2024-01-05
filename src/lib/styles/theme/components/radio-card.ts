const baseStyle = () => ({
  borderColor: 'base.800',
  borderWidth: '1px',
  borderRadius: 'lg',
  p: '2',
  bg: 'transparent',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  _checked: {
    bg: 'base.800',
    borderImage:
      'linear-gradient(rgba(52, 51, 61, 1), rgba(52, 51, 61, 1)), radial-gradient(circle at top left, #5157ff, #3da2d6, #24ffa3)',
    borderColor: 'secondary.900',
  },
});

export default {
  baseStyle,
};
