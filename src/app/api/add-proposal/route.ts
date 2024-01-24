// src/app/api/get-balance/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const events = await request.json();
    console.log('events', events);
    events.apply.forEach((item: any) => {
      item.transactions.forEach((transaction: any) => {
        console.log('transaction', transaction);
        // If the transaction has operations, loop through them
        if (transaction.operations) {
          console.log('operations');
          transaction.operations.forEach((operation: any) => {
            console.log('operation', operation);
          });
        }
      });
    });
    return NextResponse.json({ balance: 'ok i get it' });
  } catch (e: any) {
    console.error({ e });
    return NextResponse.json({ error: 'something went wrong' });
  }
}
