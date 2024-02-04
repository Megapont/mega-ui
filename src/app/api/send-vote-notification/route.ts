// src/app/api/get-balance/route.ts
import { hexToValue } from 'micro-stacks/clarity';
import { NextRequest, NextResponse } from 'next/server';
import { getDBProposal } from '../add-proposal/get-proposals';
import { getOnChainProposal } from './get-onchain-proposal';
// import { updateDBProposalVotesFor } from './update-db-votes';
// import { updateDBProposalVotesAgainst } from './update-db-votes-against';
import { DiscordRequest } from '@lib/utils/discord';

export async function POST(request: NextRequest) {
  try {
    const events = await request.json();

    events.apply.forEach((item: any) => {
      item.transactions.forEach(async (transaction: any) => {
        transaction.metadata.receipt.events.forEach(async (event: any) => {
          if (event.type === 'SmartContractEvent') {
            const print_decoded_value: any = hexToValue(event.data.raw_value);
            const voted_proposal: string = print_decoded_value.proposal;
            const onChainProposalData =
              await getOnChainProposal(voted_proposal);

            const offChainProposalData = await getDBProposal(voted_proposal);
            console.log('onChainProposalData', onChainProposalData);
            console.log('print_decoded_value', print_decoded_value);
            console.log('offchain', offChainProposalData![0]);
            // the vote was marked for the proposal
            if (print_decoded_value.for) {
              await DiscordRequest(
                `/webhooks/${process.env.WEBHOOK_ID}/${
                  process.env.WEBHOOK_TOKEN
                }?thread_id=${offChainProposalData![0].threadID}`,
                {
                  method: 'POST',
                  body: {
                    content: `@here A vote was cast in favor for this proposal by ${print_decoded_value.voter}`,
                  },
                }
              );

              // await updateDBProposalVotesFor(
              //   voted_proposal,
              //   Number(print_decoded_value.amount) +
              //     offChainProposalData![0].votesFor
              // );
            }
            // the vote was marked against the proposal
            if (print_decoded_value.for === false) {
              await DiscordRequest(
                `/webhooks/${process.env.WEBHOOK_ID}/${
                  process.env.WEBHOOK_TOKEN
                }?thread_id=${offChainProposalData![0].threadID}`,
                {
                  method: 'POST',
                  body: {
                    content: `@here A vote was cast against this proposal by ${print_decoded_value.voter}`,
                  },
                }
              );
            }
            // await updateDBProposalVotesAgainst(
            //   voted_proposal,
            //   Number(onChainProposalData.votesAgainst)
            // );
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
