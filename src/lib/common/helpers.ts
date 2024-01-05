/* eslint-disable radix */
import { c32addressDecode } from 'c32check';
import localFont from 'next/font/local';

export const contractPrincipal = (address: string) => {
  return address.split('.');
};

export const lisbeth = localFont({
  src: [
    {
      path: '../../../public/fonts/lisbeth-display.otf',
    },
  ],
  variable: '--font-lisbeth',
  style: 'normal',
});

export const getExplorerLink = (txId: string) => {
  return process.env.NODE_ENV !== 'production'
    ? `http://localhost:8000/txid/${txId}?chain=testnet`
    : `https://explorer.stacks.co/txid/${txId}?chain=mainnet`;
};

export const truncate = (
  str: string,
  firstCharCount = str.length,
  endCharCount = 0,
  dotCount = 3
) => {
  let convertedStr = '';
  convertedStr += str.substring(0, firstCharCount);
  convertedStr += '.'.repeat(dotCount);
  convertedStr += str.substring(str.length - endCharCount, str.length);
  return convertedStr;
};

export const convertToken = (token: string, decimals: number) => {
  const convertWithDecimals = 10 ** parseInt(decimals?.toString());
  return (parseInt(token) / convertWithDecimals).toLocaleString('en-US');
};

export const tokenToNumber = (amount: number, decimals: number) => {
  const convertWithDecimals = 10 ** decimals;
  return amount / convertWithDecimals;
};

export const ustxToStx = (uStx: string) => {
  return (parseInt(uStx) / 1000000).toLocaleString('en-US');
};

export const microToStacks = (
  amountInMicroStacks: string | number,
  localString = true
): number | string => {
  const value = Number(Number(amountInMicroStacks) / 10 ** 6);
  if (localString) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  }
  return value;
};

export const stxToUstx = (stx: string) => {
  return parseInt(stx) * 1000000;
};

export const tokenToDecimals = (amount: number, decimals: number) => {
  const convertWithDecimals = 10 ** parseInt(decimals?.toString());
  return amount * convertWithDecimals;
};

export const pluckSourceCode = (sourceCode: string, param: string) => {
  const sourceParam = param[0].toUpperCase() + param.substring(1);
  return sourceCode?.split(`;; ${sourceParam}: `)[1]?.split('\n')[0];
};

export const estimateDays = (blocksUntil: number) => {
  // TODO: estimate hours/minutes when blocksUntil is less than a day
  return Math.round((blocksUntil * 10) / 1440);
};

export const getPercentage = (totalSupply: number, totalVotes: number) => {
  if (Number.isNaN((totalVotes / totalSupply) * 100)) {
    return 0;
  }
  return (totalVotes / totalSupply) * 100;
};

export const formatComments = (comments: string) => {
  return comments.replace(/(?:\r\n|\r|\n)/g, ' ');
};

export const validateStacksAddress = (stacksAddress: string): boolean => {
  try {
    c32addressDecode(stacksAddress);
    return true;
  } catch (e) {
    return false;
  }
};

export const validateContractName = (contractString: string): boolean => {
  if (!contractString.includes('.')) return false;

  const stxAddress = contractString.split('.')[0];
  const contractName = contractString.split('.')[1];
  const nameRegex = /[a-zA-Z]([a-zA-Z0-9]|[-_!?+<>=/*])*$|^[-+=/*]$|^[<>]=?$/;
  try {
    const validStacksAddress = validateStacksAddress(stxAddress);
    const validName = nameRegex.exec(contractName);
    return !!(validName && validStacksAddress);
  } catch (e) {
    return false;
  }
};
