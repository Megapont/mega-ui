// src/app/api/get-balance/route.ts
import { MEGA_GOVERNANCE_CONTRACT, stacksNetwork } from '@common/constants';
import { tokenToNumber } from '@lib/common/helpers';
// import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { standardPrincipalCV } from 'micro-stacks/clarity';
// import { StacksTestnet } from 'micro-stacks/network';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const network = new stacksNetwork();
    const url = network.getCoreApiUrl();

    const balance = await fetch(
      `${url}/v2/contracts/call-read/${
        MEGA_GOVERNANCE_CONTRACT.split('.')[0]
      }/${MEGA_GOVERNANCE_CONTRACT.split('.')[1]}/get-balance`,
      {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },

        body: JSON.stringify({
          sender: params.address,
          arguments: [standardPrincipalCV(params.address)],
        }),
      }
    );
    // const balance: any = await fetchReadOnlyFunction({
    //   network: new StacksTestnet(),
    //   contractAddress: MEGA_GOVERNANCE_CONTRACT.split('.')[0],
    //   contractName: MEGA_GOVERNANCE_CONTRACT.split('.')[1],
    //   senderAddress: params.address,
    //   functionArgs: [standardPrincipalCV(params.address)],
    //   functionName: 'get-balance',
    // });
    console.log(await balance.json());

    return NextResponse.json({
      balance: tokenToNumber(parseInt(await balance.json()), 2),
    });
  } catch (e: any) {
    console.error({ e });
  }
}
