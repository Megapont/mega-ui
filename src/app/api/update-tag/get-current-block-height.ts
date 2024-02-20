import { stacksNetwork } from '@lib/common/constants';

export async function getCurrentBlockHeight() {
  try {
    const network = new stacksNetwork();
    const url = network.getCoreApiUrl();

    const blocks = await fetch(`${url}/extended/v2/blocks`, {
      cache: 'no-store',
    });
    const result = await blocks.json();
    return result.total;
  } catch (e: any) {
    console.error({ e });
  }
}
