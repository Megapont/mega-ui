import { stacksNetwork } from '@lib/common/constants';
import { fetchBlocks } from 'micro-stacks/api';

export async function getCurrentBlockHeight() {
  try {
    const network = new stacksNetwork();
    const url = network.getCoreApiUrl();
    const limit = 1;
    const offset = 0;
    const blocks = await fetchBlocks({
      url,
      limit,
      offset,
    });
    return blocks.total;
  } catch (e: any) {
    console.error({ e });
  }
}
