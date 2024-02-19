// src/app/api/get-balance/route.ts
import { getParameter } from '@lib/common/api';
import {
  MEGA_SUBMISSION_CONTRACT,
  baseUrl,
  forumChannelID,
} from '@lib/common/constants';
import { DiscordRequest } from '@utils/discord';
import { NextRequest, NextResponse } from 'next/server';
import { getDBProposal } from './get-proposals';
import { submitProposal } from './submit-proposal';
import { truncate } from '@lib/common/helpers';

const submission = {
  contractAddress: MEGA_SUBMISSION_CONTRACT,
};

export async function POST(request: NextRequest) {
  try {
    const events = await request.json();
    const channel = await DiscordRequest(`channels/${forumChannelID}`, {
      method: 'GET',
    });

    const tagIds: string[] = channel.available_tags.reduce(
      (acc: string[], tag: any) => {
        if (tag.name === 'Proposal' || tag.name === 'Pending') {
          acc.push(tag.id);
        }
        return acc;
      },
      []
    );

    const proposalDuration: any = await getParameter(
      submission?.contractAddress,
      'proposalDuration'
    );
    const regex = /\(([^,]+)/;
    const start_height_regex = /u(\d+)\)/;

    console.log(tagIds, proposalDuration);

    events.apply.forEach((item: any) => {
      item.transactions.forEach(async (transaction: any) => {
        if (transaction.metadata.result.includes('true')) {
          console.log('transaction', transaction);
          const proposal: string =
            transaction.metadata.description.match(regex)[1];
          const startBlockHeight =
            transaction.metadata.description.match(start_height_regex)[1];
          const endBlockHeight =
            Number(startBlockHeight) + Number(proposalDuration);

          const dbProposal = await getDBProposal(proposal);

          console.log(
            'dbProposal',
            dbProposal,
            proposal,
            startBlockHeight,
            endBlockHeight
          );

          if (dbProposal) {
            if (!dbProposal[0].submitted) {
              const new_thread = await DiscordRequest(
                `channels/${forumChannelID}/threads`,
                {
                  method: 'POST',
                  body: {
                    name: `${proposal.split('.')[1]} proposal`,
                    auto_archive_duration: 1440,
                    message: {
                      content: `Heads up! A fresh proposal has just landed.\n proposed by ${truncate(
                        transaction.metadata.sender,
                        5,
                        5
                      )}\n proposal link: ${baseUrl}proposals/${proposal} \n\n **Title** : ${
                        dbProposal[0].title
                      }\n\n **Description** : ${dbProposal[0].description}`,
                    },
                    applied_tags: tagIds,
                  },
                }
              );

              submitProposal({
                contractAddress: proposal,
                startBlockHeight,
                endBlockHeight,
                threadID: new_thread.id,
                submitted: true,
              });
            }
          }
        }
      });
    });
    return NextResponse.json({ message: 'OK', status: 200 });
  } catch (e: any) {
    console.error({ e });
    return NextResponse.json({ error: 'something went wrong' });
  }
}
