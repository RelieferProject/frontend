import store, { persistor } from '@states/store';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PopupProvider } from './Popup';
import ConfirmContextProvider from './Confirm';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from '@utils/web3React';

interface Props {
  children: React.ReactNode;
}

function Providers(props: Props) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfirmContextProvider>
            <PopupProvider>{props.children}</PopupProvider>
          </ConfirmContextProvider>
        </PersistGate>
      </ReduxProvider>
    </Web3ReactProvider>
  );
}

export default Providers;
