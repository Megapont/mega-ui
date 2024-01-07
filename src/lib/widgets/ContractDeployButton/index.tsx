import { Button, ButtonProps, Spinner } from '@chakra-ui/react';

// Stacks
import { useOpenContractDeploy } from '@micro-stacks/react';
import { useStore } from '@store/CodeStore';

type ContractDeployType = {
  label: JSX.Element;
  description: string;
  contractName: string;
  onFinish?: (data: any) => void;
};

export const ContractDeployButton = (
  props: ButtonProps & ContractDeployType
) => {
  const { code } = useStore();

  const { openContractDeploy, isRequestPending } = useOpenContractDeploy();
  const { contractName, onFinish, label } = props;

  const handleContractDeploy = async () => {
    console.log('contractName', contractName);
    await openContractDeploy({
      contractName,
      codeBody: code,
      onFinish,
      onCancel: () => {
        console.log('popup closed!');
      },
    });
  };

  return (
    <Button
      {...props}
      colorScheme="base"
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
      onClick={() => handleContractDeploy()}
    >
      {isRequestPending ? <Spinner /> : label}
    </Button>
  );
};
