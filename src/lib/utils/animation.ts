export const OPEN_SPRING = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};
export const CLOSE_SPRING = {
  type: 'spring',
  stiffness: 300,
  damping: 35,
};

export const PAGE_TRANSITION_BASE = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const PAGE_TRANSITION_VARIANTS = {
  initial: {
    opacity: 0,
    x: -200,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 200,
  },
};

export const PAGE_TRANSITION = {
  type: 'spring',
  mass: 0.35,
  stiffness: 75,
  duration: 0.3,
};

export const SLIDE_UP_ANIMATION = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 1,
  },
};

export const FAST_SLIDE_UP_ANIMATION = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.65,
    type: { type: 'spring', stiffness: 75, mass: 0.35 },
  },
};

export const FADE_IN = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    delay: 0.1,
    duration: 0.25,
  },
};

export const FADE_IN_VARIANTS = {
  hidden: {
    opacity: 0,
    x: 0,
    y: 0,
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: {
    opacity: 0,
    x: 0,
    y: 0,
  },
};
