import React, { useState } from 'react';

const STATES = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
};

interface contextInterface {
  popup: any;
  content: argType;
  success: (arg: argType) => any;
  error: (arg: argType) => any;
  clear: () => any;
  loading: (arg: argType) => any;
  tone: string;
}

interface argType {
  title?: string;
  callBack?: (...arg: any[]) => any;
  text?: React.ReactNode;
  type?: string;
  disable?: boolean;
}

const initial: argType = {
  title: '',
  callBack: null,
  text: '',
  type: '',
  disable: false,
};

const PopupContext = React.createContext<contextInterface>({
  popup: null,
  content: initial,
  success: (e) => {},
  error: (e) => {},
  clear: () => {},
  loading: (e) => {},
  tone: 'secondary',
});

const PopupProvider = (props) => {
  const [popup, setPopup] = useState(null);
  const [tone, setTone] = useState('blue');
  const [content, setContent] = useState<argType>(initial);

  const success = (con: argType) => {
    setTone('secondary');
    setContent({ ...con, type: STATES.SUCCESS });
    setPopup(STATES.SUCCESS);
  };
  const error = (con: argType) => {
    setTone('primary');
    setContent({ ...con, type: STATES.ERROR });
    setPopup(STATES.ERROR);
  };
  const loading = (con: argType) => {
    setTone('secondary');
    setContent({ ...con, type: STATES.LOADING });
    setPopup(STATES.LOADING);
  };
  const clear = () => {
    setPopup(null);
    setTimeout(() => {
      setContent(initial);
    }, 300);
  };
  return (
    <PopupContext.Provider
      value={{
        success,
        error,
        clear,
        loading,
        popup,
        content,
        tone,
      }}
    >
      {props.children}
    </PopupContext.Provider>
  );
};

export { PopupProvider };
export default PopupContext;
