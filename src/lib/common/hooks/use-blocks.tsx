// Hook (use-blocks.tsx)
import { useCallback, useEffect, useState } from 'react';

import { useNetwork } from '@micro-stacks/react';
//import { fetchBlocks } from 'micro-stacks/api';

export function useBlocks() {
  const [state, setState] = useState<any>({
    blocks: [],
    currentBlockHeight: 0,
  });
  const { network } = useNetwork();
  const getBlocks = useCallback(async () => {
    try {
      const url = network.getCoreApiUrl();
      // const limit = 1;
      // const offset = 0;
      // const blocks = await fetchBlocks({
      //   url,
      //   limit,
      //   offset,
      // });
      const blocks = await fetch(`${url}/extended/v2/blocks`, {
        cache: 'no-store',
      }).then((result) => result.json());
      setState({
        ...state,
        blocks: blocks,
        currentBlockHeight: blocks.total,
      });
    } catch (e: any) {
      console.error({ e });
    }
  }, [network, state]);

  useEffect(() => {
    getBlocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { blocks: state.blocks, currentBlockHeight: state.currentBlockHeight };
}
