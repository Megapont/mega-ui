// src/app/api/get-balance/route.ts
import { MEGA_GOVERNANCE_CONTRACT } from '@common/constants';
import { tokenToNumber } from '@lib/common/helpers';
import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { standardPrincipalCV } from 'micro-stacks/clarity';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const balance: any = await fetchReadOnlyFunction({
      contractAddress: MEGA_GOVERNANCE_CONTRACT.split('.')[0],
      contractName: MEGA_GOVERNANCE_CONTRACT.split('.')[1],
      senderAddress: params.address,
      functionArgs: [standardPrincipalCV(params.address)],
      functionName: 'get-balance',
    });
    console.log(balance);

    return NextResponse.json({ balance: tokenToNumber(parseInt(balance), 2) });
  } catch (e: any) {
    console.error({ e });
  }
}
