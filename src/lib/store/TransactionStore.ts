import { atom, useAtom } from 'jotai';

interface Transaction {
  txId: any;
  data: any;
}

interface TransactionStore {
  transaction: Transaction;
  setTransaction: (transaction: Transaction) => void;
}

const initialState: TransactionStore = {
  transaction: { txId: null, data: null },
  setTransaction: () => {},
};

export const transactionAtom = atom(initialState);

export const useStore = () => {
  const [state, setState] = useAtom(transactionAtom);

  const setTransaction = (transaction: Transaction) => {
    setState((prevState) => ({
      ...prevState,
      transaction,
    }));
  };

  return {
    ...state,
    setTransaction,
  };
};
