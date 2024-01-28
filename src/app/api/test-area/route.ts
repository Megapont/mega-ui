// src/app/api/get-balance/route.ts
import { DiscordRequest } from '@utils/discord';
import { NextResponse } from 'next/server';
// 1196848175269544077 -> general
// 1196848143959077075 -> proposal
export async function DELETE() {
  try {
    const channel = await DiscordRequest(`channels/1200119371167694941`, {
      method: 'DELETE',
    });

    return NextResponse.json({ message: 'OK', status: 200, data: channel });
  } catch (e: any) {
    console.error({ e });
    return NextResponse.json({ error: 'something went wrong' });
  }
}
