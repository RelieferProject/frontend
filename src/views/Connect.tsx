import styled from 'styled-components';
import React, { useState } from 'react';
import metamask from '@assets/images/wallet/metamask.svg';
import trustWallet from '@assets/images/wallet/trustWallet.svg';
import mathWallet from '@assets/images/wallet/mathWallet.svg';
import tokenPocket from '@assets/images/wallet/tokenPocket.svg';
import walletConnect from '@assets/images/wallet/walletConnect.svg';
import { CSSTransition } from 'react-transition-group';
import ButtonStyled from '@components/ButtonStyled';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { injected, walletconnect } from '@utils/connectors';
import { removeLocal, setLocal } from '@utils/localStorage';
import { FiCopy } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAppDispatch } from '@states/hooks';
import { LOGOUT } from '@states/profile/action';
import { useToken } from '@states/profile/hooks';
import { switchChainFunction } from '@utils/web3Hooks';

const WalletConnectWrapper = styled.div``;

const ConnectorNames = {
  Injected: injected,
  WalletConnect: walletconnect,
};

const providerList = [
  {
    key: 'Metamask',
    img: metamask,
    name: 'MetaMask Wallet',
    connect: ConnectorNames.Injected,
  },
  {
    key: 'Trust Wallet',
    img: trustWallet,
    name: 'Trust Wallet',
    connect: ConnectorNames.Injected,
  },
  {
    key: 'Math Wallet',
    img: mathWallet,
    name: 'Math Wallet',
    connect: ConnectorNames.Injected,
  },
  {
    key: 'Token Pocket',
    name: 'Token Pocket Wallet',
    img: tokenPocket,
    connect: ConnectorNames.Injected,
  },
  {
    key: 'Wallet Connect',
    name: 'Wallet Connect',
    img: walletConnect,
    connect: ConnectorNames.WalletConnect,
  },
];

function WalletConnect() {
  // web3
  const context = useWeb3React<Web3>();
  const { account, activate, deactivate, active } = context;
  const dispath = useAppDispatch();

  const [copy, setCopy] = useState(false);
  const [state, seState] = useState('Metamask');
  const token = useToken();

  const onClickConnect = (connect: any) => {
    try {
      switchChainFunction();
    } catch (error) {
      console.log(error);
    }
    activate(connect);
    setLocal('isLogin', true);
  };

  const logout = () => {
    deactivate();
    removeLocal('isLogin');
    dispath(LOGOUT());
  };

  return (
    <div className="w-full relative md:px-32 px-10 my-20 flex flex-col items-center space-y-10 font-sans">
      <CSSTransition in={!active || !token} timeout={300} classNames="fade" unmountOnExit>
        <div className="absolute top-0 flex flex-col items-center space-y-10">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-5xl text-black mb-4">Connect your crypto wallet</h2>
            <p className="text-2xl">Connect with one of available wallet providers</p>
          </div>
          {/* wallet list */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 maxsm:grid-cols-2 sm:grid-cols-3 justify-center items-center">
            {providerList.map((e) => (
              <div
                onClick={() => {
                  seState(e.key);
                }}
                className={`px-7 h-40 m-3 rounded-md bg-bg-purple-default 
            border-[1px] border-bg-dark-medium flex flex-col 
            space-y-4 items-center justify-center
            cursor-pointer transition-all hover:border-text-blue ${
              state === e.key ? 'border-text-blue' : 'border-bg-dark-medium'
            }`}
                key={e.key}
              >
                <img className="w-20 h-20" src={e.img} alt={e.key}></img>
                <b className="text-2xl font-[600] text-bg-light-blue">{e.key}</b>
              </div>
            ))}
          </div>
          {/*  */}
          <div className="relative min-h-[40rem] flex justify-center">
            {providerList.map((e) => (
              <CSSTransition
                in={state === e.key}
                timeout={300}
                classNames="fade"
                unmountOnExit
                mountOnEnter
                key={e.key + 'connect'}
              >
                <div className="min-w-[40rem] absolute top-0 mx-auto p-10 rounded-md bg-bg-purple-default  flex flex-col items-center space-y-8">
                  <img className="w-[13rem]" src={e.img} alt="" />
                  <b className="text-3xl text-white">Connect your {e.name}</b>
                  <ButtonStyled
                    onClick={() => onClickConnect(e.connect)}
                    color="secondary"
                    className="w-full text-center"
                  >
                    Sign in
                  </ButtonStyled>
                </div>
              </CSSTransition>
            ))}
          </div>
        </div>
      </CSSTransition>
      {/*  */}
      <CSSTransition in={active && Boolean(token)} timeout={300} classNames="fade" unmountOnExit>
        <div className="min-w-[40rem] absolute top-0 mx-auto p-10 rounded-md bg-bg-dark-medium flex flex-col items-center space-y-8">
          <b className="text-5xl text-white">Your wallet</b>

          <div className="w-full relative flex items-center">
            <div className="text-white text-2xl p-4 w-full rounded-md bg-bg-dark-light">{account}</div>

            <ButtonStyled color="secondary" className="w-[10rem]">
              <CopyToClipboard text={account || ''}>
                <div className="w-full flex items-center justify-center">
                  <FiCopy className="mr-2" />
                </div>
              </CopyToClipboard>
            </ButtonStyled>
          </div>

          <ButtonStyled className="text-center w-full" onClick={logout}>
            Sign out
          </ButtonStyled>
        </div>
      </CSSTransition>
    </div>
  );
}

export default WalletConnect;
