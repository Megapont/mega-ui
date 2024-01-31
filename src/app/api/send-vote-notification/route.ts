// src/app/api/get-balance/route.ts
import { hexToValue } from 'micro-stacks/clarity';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const events = await request.json();

    events.apply.forEach((item: any) => {
      item.transactions.forEach(async (transaction: any) => {
        transaction.metadata.receipt.events.forEach((event: any) => {
          if (event.type === 'SmartContractEvent') {
            console.log('EVENT ========>\n', event);
            console.log('value', hexToValue(event.data.raw_value));
          }
        });
      });
    });
    return NextResponse.json({ message: 'OK', status: 200 });
  } catch (e: any) {
    console.error({ e });
    return NextResponse.json({ error: 'something went wrong' });
  }
}
