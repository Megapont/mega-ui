import { StacksMocknet, StacksMainnet } from 'micro-stacks/network';

export const stacksNetwork =
  process.env.NODE_ENV === 'production' ? StacksMainnet : StacksMocknet;
export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://app.stackerdaos.com'
    : 'http://localhost:3001/';
export const devnet = process.env.NODE_ENV === 'development';
export const EXECUTOR_DAO_CONTRACT = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.executor-dao'
  : 'testnet_contract';
export const STACKS_API_URL = devnet
  ? 'http://localhost:3999'
  : 'https://stacks-node-api.testnet.stacks.co';
export const traitPrincipal = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
  : 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD';
export const appDetails = {
  name: 'StackerDAO Labs',
  icon: 'https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png',
};
export const adminAddress = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
  : 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD' ||
    'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X';
export const vaultAddress = devnet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sde-vault'
  : 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X.mega-vault';
