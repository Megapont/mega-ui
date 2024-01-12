// src/app/api/get-balance/route.ts
export const dynamic = 'auto';

import { stacksNetwork } from '@common/constants';
import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { assetContractPrincipal: string } }
) {
  try {
    const network = new stacksNetwork();

    const contractAddress = params.assetContractPrincipal!.split('.')[0];
    const contractName = params.assetContractPrincipal!.split('.')[1];
    const functionName = request.nextUrl.searchParams.get('functionName');

    const data: any = await fetchReadOnlyFunction({
      network,
      contractAddress,
      contractName,
      senderAddress: params.assetContractPrincipal!,
      functionArgs: [],
      functionName: functionName!,
    });
    if (typeof data === 'bigint') {
      return NextResponse.json({ data: data.toString() });
    }

    return NextResponse.json({ data });
  } catch (e: any) {
    console.error({ e });
  }
}
