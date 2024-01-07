import { atom, useAtom } from 'jotai';

interface CodeStore {
  code: string;
  setCode: (code: string) => void;
}
const initialContractBoilerplate = `;; This is a boilerplate contract for a proposal 

(impl-trait .proposal-trait.proposal-trait)

(define-constant MICRO (pow u10 u2))

(define-public (execute (sender principal))
	(begin
		(try! (contract-call? .vault transfer-ft .token (* MICRO u100) 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6))

		(print {event: "execute", sender: sender})
		(ok true)
	)
)
  `;

const initialState: CodeStore = {
  code: initialContractBoilerplate,
  setCode: () => {},
};

export const codeAtom = atom(initialState);

export const useStore = () => {
  const [state, setState] = useAtom(codeAtom);

  const setCode = (code: string) => {
    setState((prevState) => ({
      ...prevState,
      code,
    }));
  };

  return {
    ...state,
    setCode,
  };
};
