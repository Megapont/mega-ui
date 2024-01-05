import { has } from 'lodash';
import {
  trueCV,
  falseCV,
  contractPrincipalCV,
  standardPrincipalCV,
  tupleCV,
  someCV,
  noneCV,
} from 'micro-stacks/clarity';
import {
  FungibleConditionCode,
  makeContractSTXPostCondition,
  makeContractFungiblePostCondition,
  createAssetInfo,
} from 'micro-stacks/transactions';
import { stxToUstx, tokenToDecimals } from './helpers';

export const getDelegators = ({
  voteFor,
  proposalContractAddress,
  proposalContractName,
  delegatorAddresses,
}: any) => {
  return delegatorAddresses?.map((address: any) => {
    const delegatorVotes =
      proposalContractAddress &&
      proposalContractName &&
      tupleCV({
        for: voteFor ? trueCV() : falseCV(),
        proposal: contractPrincipalCV(
          proposalContractAddress,
          proposalContractName
        ),
        delegator: someCV(standardPrincipalCV(address)),
      });
    return delegatorVotes;
  });
};

export const generateWithDelegators = ({
  voteFor,
  proposalContractAddress,
  proposalContractName,
  delegators,
}: any) => {
  if (proposalContractAddress && proposalContractName && delegators) {
    return [
      tupleCV({
        for: voteFor ? trueCV() : falseCV(),
        proposal: contractPrincipalCV(
          proposalContractAddress,
          proposalContractName
        ),
        delegator: noneCV(),
      }),
      ...delegators,
    ] as any;
  }
};

export const generatePostConditions = ({
  postConditions,
  isPassing,
  assetName,
  fungibleTokenDecimals,
}: any) => {
  if (postConditions) {
    const { from, amount } = postConditions;
    const isFungible = has(postConditions, 'assetAddress');
    if (isFungible) {
      // Token Post Condition
      const { assetAddress } = postConditions;
      const contractAddress = from?.split('.')[0];
      const contractName = from?.split('.')[1];
      const contractAssetAddress = assetAddress?.split('.')[0];
      const contractAssetName = assetAddress?.split('.')[1];
      const fungibleAssetInfo =
        contractAssetAddress &&
        contractAssetName &&
        createAssetInfo(contractAssetAddress, contractAssetName, assetName);
      const pc = isPassing
        ? [
            makeContractFungiblePostCondition(
              contractAddress,
              contractName,
              FungibleConditionCode.Equal,
              tokenToDecimals(Number(amount), fungibleTokenDecimals),
              fungibleAssetInfo
            ),
          ]
        : [];
      return pc;
    } else {
      // STX Post Condition
      const contractAddress = from?.split('.')[0];
      const contractName = from?.split('.')[1];
      const postConditionCode = FungibleConditionCode.Equal;
      const postConditionAmount = stxToUstx(amount);
      const postConditions = isPassing
        ? [
            makeContractSTXPostCondition(
              contractAddress,
              contractName,
              postConditionCode,
              postConditionAmount
            ),
          ]
        : [];
      return postConditions;
    }
  }
};

export function findExtension(extensions: Array<any[]>, type: string): any {
  return extensions?.find((extension: any) => extension.name === type);
}
