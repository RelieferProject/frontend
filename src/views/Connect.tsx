import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { injected, walletconnect } from '@utils/connectors';
import metamask from '@assets/images/wallet/metamask.svg';
import trustWallet from '@assets/images/wallet/trustWallet.svg';
import mathWallet from '@assets/images/wallet/mathWallet.svg';
import tokenPocket from '@assets/images/wallet/tokenPocket.svg';
import walletConnect from '@assets/images/wallet/walletConnect.svg';
import { CSSTransition } from 'react-transition-group';
import { switchChainFunction } from '@utils/web3Hooks';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { removeLocal, setLocal } from '@utils/localStorage';
import ButtonStyled from '@components/ButtonStyled';
import { useNavigate } from 'react-router-dom';

interface Props {}

const ConnectWrapper = styled.div``;

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

function Connect(props: Props) {
  // web3
  const context = useWeb3React<Web3>();
  const { account, activate, deactivate, active } = context;
  const navigate = useNavigate();

  const [state, seState] = useState('Metamask');

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
    // dispath(LOGOUT());
  };

  useEffect(() => {
    if (active) {
      navigate('/admin/dashboard');
    }
  }, []);

  return (
    <ConnectWrapper className="h-screen w-full flex justify-center items-center">
      <div className="relative flex flex-col items-center space-y-10 bg-black bg-opacity-60 p-8 rounded">
        <div className="w-full flex flex-col items-center mt-8">
          <h2 className="text-5xl mb-4">Connect your crypto wallet</h2>
          <p className="text-2xl text-white">Connect with one of available wallet providers</p>
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
              <img className="w-12 h-12" src={e.img} alt={e.key}></img>
              <b className="text-base font-[600] text-white">{e.key}</b>
            </div>
          ))}
        </div>
        {/*  */}
        <div className="relative min-h-[30rem] flex justify-center">
          {providerList.map((e) => (
            <CSSTransition
              in={state === e.key}
              timeout={300}
              classNames="fade"
              unmountOnExit
              mountOnEnter
              key={e.key + 'connect'}
            >
              <div className="min-w-[30rem] absolute top-0 mx-auto p-10 rounded-md bg-bg-purple-default  flex flex-col items-center space-y-8">
                <img className="w-[4rem]" src={e.img} alt="" />
                <b className="text-2xl text-white text-center">Connect your {e.name}</b>
                <ButtonStyled
                  onClick={() => onClickConnect(e.connect)}
                  color="secondary"
                  className="w-full text-center text-white"
                >
                  Sign in
                </ButtonStyled>
              </div>
            </CSSTransition>
          ))}
        </div>
      </div>
    </ConnectWrapper>
  );
}

export default Connect;
