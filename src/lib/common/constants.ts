import {
  StacksMainnet,
  //StacksMocknet,
  StacksTestnet,
} from 'micro-stacks/network';

export const stacksNetwork =
  process.env.NODE_ENV === 'production' ? StacksMainnet : StacksTestnet;

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://dao.megapont.com/'
    : 'http://localhost:3000/';

export const devnet = process.env.NODE_ENV === 'development';

export const MEGA_DAO_CONTRACT = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.mega-dao'
  : 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X.mega-dao';

export const MEGA_GOVERNANCE_CONTRACT = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.token'
  : 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.mega';

export const MEGA_VAULT_CONTRACT = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.vault'
  : 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X.mega-vault';

export const MEGA_SUBMISSION_CONTRACT = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.proposal-submission'
  : 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X.mega-submission-v2';

export const MEGA_VOTING_CONTRACT = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.proposal-voting'
  : 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X.mega-voting-v2';

export const STACKS_API_URL = devnet
  ? 'https://stacks-node-api.testnet.stacks.co'
  : 'https://stacks-node-api.testnet.stacks.co';

export const traitPrincipal = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
  : 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD';

export const forumChannelID = devnet
  ? '1196847949087522937'
  : '1196847949087522937';

export const appDetails = {
  name: 'MegaDAO',
  icon: 'https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png',
};

export const adminAddress = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
  : 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD' ||
    'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X';
