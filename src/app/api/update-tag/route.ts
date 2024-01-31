// src/app/api/get-balance/route.ts
import { forumChannelID } from '@lib/common/constants';
import { DiscordRequest } from '@utils/discord';
import { NextResponse } from 'next/server';
import { getAllDBProposal } from './get-all-proposals';
import { getCurrentBlockHeight } from './get-current-block-height';

export async function GET() {
  try {
    const channel = await DiscordRequest(`channels/${forumChannelID}`, {
      method: 'GET',
    });
    const proposals = await getAllDBProposal();
    if (!proposals) {
      return NextResponse.json({
        message: 'no proposals found in DB',
        status: 404,
      });
    }

    proposals.forEach(async (proposal: any) => {
      const currentBlockHeight = await getCurrentBlockHeight();
      const startBlockHeight = proposal.startBlockHeight;
      const endBlockHeight = proposal.endBlockHeight;

      const isClosed = currentBlockHeight > endBlockHeight;
      const isOpen =
        currentBlockHeight <= endBlockHeight &&
        currentBlockHeight >= startBlockHeight;
      const concluded = proposal.concluded;
      const tagName = concluded
        ? 'Concluded'
        : isClosed
        ? 'Ready to Execute'
        : isOpen
        ? 'Live'
        : 'Pending';

      console.log(
        tagName,
        currentBlockHeight,
        startBlockHeight,
        endBlockHeight
      );

      const tagIds: string[] = channel.available_tags.reduce(
        (acc: string[], tag: any) => {
          if (tag.name === 'Proposal' || tag.name === tagName) {
            acc.push(tag.id);
          }
          return acc;
        },
        []
      );
      if (proposal.threadID) {
        await DiscordRequest(`channels/${proposal.threadID}`, {
          method: 'PATCH',
          body: {
            applied_tags: tagIds,
          },
        });
      }
    });

    return NextResponse.json({ message: 'OK', status: 200 });
  } catch (e: any) {
    console.error({ e });
    return NextResponse.json({ error: 'something went wrong' });
  }
}
