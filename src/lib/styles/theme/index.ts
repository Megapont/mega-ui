/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendTheme } from '@chakra-ui/react';

import * as components from './components';
import * as config from './config';
import * as foundations from './foundations';

const theme: Record<string, any> = extendTheme({
  config,
  components: { ...components },
  ...foundations,
});

export default extendTheme(theme);
