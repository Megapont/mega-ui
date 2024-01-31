// src/app/api/get-balance/route.ts
import { DiscordRequest } from '@utils/discord';
import { NextResponse } from 'next/server';
// 1196848175269544077 -> general
// 1196848143959077075 -> proposal
// 1196847949087522937 => forum channel ID
export async function DELETE() {
  try {
    const channel = await DiscordRequest(`channels/1202174232247930920`, {
      method: 'DELETE',
    });
    // const channel = await DiscordRequest(`channels/${forumChannelID}`, {
    //   method: 'GET',
    // });

    return NextResponse.json({ message: 'OK', status: 200, data: channel });
  } catch (e: any) {
    console.error({ e });
    return NextResponse.json({ error: 'something went wrong' });
  }
}
