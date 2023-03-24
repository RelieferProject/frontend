import React, { createContext, useMemo, useState } from 'react';

interface confirmContextInterface {
  confirm?: confirmValueInterface;
  setConfirm?: React.Dispatch<React.SetStateAction<confirmValueInterface>>;
  setState?: React.Dispatch<React.SetStateAction<stateContext>>;
  state?: stateContext;
}

interface confirmValueInterface {
  isOpen?: boolean;
  proceed?: (...arg: any[]) => any;
  cancel?: (...arg: any[]) => any;
}

export interface stateContext {
  title?: string;
  input?: boolean;
  text?: React.ReactNode;
  type?: string;
  callBack?: (...arg: any[]) => any;
  value?: string;
  max?: number;
  noCancel?: boolean;
}

export const initial: stateContext = {
  title: '',
  callBack: null,
  text: '',
  type: 'text',
  input: false,
  value: '',
  max: null,
  noCancel: false,
};

export const ConfirmContext = createContext<confirmContextInterface>({});

const ConfirmContextProvider = ({ children }) => {
  const [confirm, setConfirm] = useState<confirmValueInterface>({
    isOpen: false,
    proceed: null,
    cancel: null,
  });

  const [state, setState] = useState<stateContext>(initial);

  return (
    <ConfirmContext.Provider
      value={{
        confirm,
        setConfirm,
        state,
        setState,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
};
export default ConfirmContextProvider;
