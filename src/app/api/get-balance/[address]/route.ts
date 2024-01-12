// src/app/api/get-balance/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MEGA_GOVERNANCE_CONTRACT } from '@common/constants';
import { tokenToNumber } from '@lib/common/helpers';
import { stacksNetwork } from '@common/constants';
import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { standardPrincipalCV } from 'micro-stacks/clarity';

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const network = new stacksNetwork();
    const balance: any = await fetchReadOnlyFunction({
      network,
      contractAddress: MEGA_GOVERNANCE_CONTRACT.split('.')[0],
      contractName: MEGA_GOVERNANCE_CONTRACT.split('.')[1],
      senderAddress: params.address,
      functionArgs: [standardPrincipalCV(params.address)],
      functionName: 'get-balance',
    });
    return NextResponse.json({ balance: tokenToNumber(parseInt(balance), 2) });
  } catch (e: any) {
    console.error({ e });
  }
}
