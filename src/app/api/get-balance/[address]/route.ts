// src/app/api/get-balance/route.ts
import { MEGA_GOVERNANCE_CONTRACT, stacksNetwork } from '@common/constants';
import { tokenToNumber } from '@lib/common/helpers';
import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { standardPrincipalCV } from 'micro-stacks/clarity';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    // const network = new stacksNetwork();
    // const url = network.getCoreApiUrl();

    // const balance = await fetch(
    //   `${url}/v2/contracts/call-read/${
    //     MEGA_GOVERNANCE_CONTRACT.split('.')[0]
    //   }/${MEGA_GOVERNANCE_CONTRACT.split('.')[1]}/get-balance`,
    //   {
    //     method: 'POST',
    //     cache: 'no-store',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },

    //     body: JSON.stringify({
    //       sender: params.address,
    //       arguments: [standardPrincipalCV(params.address)],
    //     }),
    //   }
    // );
    const balance: any = await fetchReadOnlyFunction({
      network: new stacksNetwork(),
      contractAddress: MEGA_GOVERNANCE_CONTRACT.split('.')[0],
      contractName: MEGA_GOVERNANCE_CONTRACT.split('.')[1],
      senderAddress: params.address,
      functionArgs: [standardPrincipalCV(params.address)],
      functionName: 'get-balance',
    });

    return NextResponse.json({
      balance: tokenToNumber(parseInt(balance), 2),
    });
  } catch (e: any) {
    return NextResponse.json({
      error: e.message,
    });
  }
}
