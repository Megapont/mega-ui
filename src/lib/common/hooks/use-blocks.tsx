// Hook (use-blocks.tsx)
import { useCallback, useEffect, useState } from 'react';

import { useNetwork } from '@micro-stacks/react';
import { fetchBlocks } from 'micro-stacks/api';

export function useBlocks() {
  // TODO: check if slug is present and return error if not
  // TODO: check if oranization exists before checking balance
  const [state, setState] = useState<any>({
    blocks: [],
    currentBlockHeight: 0,
  });
  const { network } = useNetwork();
  const getBlocks = useCallback(async () => {
    try {
      const url = network.getCoreApiUrl();
      const limit = 1;
      const offset = 0;
      const blocks = await fetchBlocks({
        url,
        limit,
        offset,
      });
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
