import { useToken } from '@states/profile/hooks';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { RiWallet3Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

interface Props extends SimpleComponent {}

function ConnectWalletBtn(props: Props) {
  // web3
  const context = useWeb3React<Web3>();
  const { account: accountWeb3, active } = context;
  const token = useToken();

  return (
    <Link to="/connect">
      <div
        className={`text-2xl flex items-center justify-center bg-secondary1 text-white custom-gradient-secondary-hover py-4 px-6 rounded-full cursor-pointer ${props.className}`}
        style={props.style}
      >
        {/* <RiWallet3Fill className="custom-gradient-text-primary" /> */}
        <div className="font-bold text-xl text-white">
          {token
            ? accountWeb3.slice(0, 4) +
              '....' +
              accountWeb3.slice(accountWeb3.length - 4, accountWeb3.length)
            : 'Connect Wallet'}
        </div>
      </div>
    </Link>
  );
}

export default ConnectWalletBtn;
