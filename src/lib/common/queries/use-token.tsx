// Hook (use-token.tsx)
import { useQuery } from 'react-query';
//import { useExtension } from '@common/queries';
import { getTokenMetadata, getVaultBalance } from '@common/api';
import { MEGA_GOVERNANCE_CONTRACT, MEGA_VAULT_CONTRACT } from '../constants';

export function useToken() {
  //const { extension: governanceToken } = useExtension('Governance Token');
  const governanceToken = {
    contractAddress: MEGA_GOVERNANCE_CONTRACT,
  };
  const {
    isFetching,
    isIdle,
    isLoading,
    isError,
    data: token,
  } = useQuery(
    ['token', `${governanceToken?.contractAddress}`],
    async () => {
      const contractAddress = governanceToken?.contractAddress.split('.')[0];
      const contractName = governanceToken?.contractAddress.split('.')[1];
      const data = await getTokenMetadata(
        `${governanceToken?.contractAddress.split(
          '.'
        )[0]}.${governanceToken?.contractAddress.split('.')[1]}`
      );
      console.log(data);
      return { contractAddress, contractName, ...data };
    },
    {
      enabled: !!governanceToken?.contractAddress,
      refetchOnWindowFocus: false,
    }
  );

  //const { extension: vault } = useExtension('Vault');
  const vault = {
    contractAddress: MEGA_VAULT_CONTRACT,
  };
  const { data: balance } = useQuery(
    'vault-balance',
    async () => {
      const data = await getVaultBalance(
        `${vault?.contractAddress.split('.')[0]}.${vault?.contractAddress.split(
          '.'
        )[1]}`
      );
      return data;
    },
    {
      enabled: !!vault?.contractAddress,
      refetchOnWindowFocus: false,
    }
  );

  return { isFetching, isIdle, isLoading, isError, token, balance };
}
