import styled from 'styled-components';
import { FaEthereum } from 'react-icons/fa';
import { useToken } from '@states/profile/hooks';
import useActiveWeb3React from '@hooks/useActiveWeb3React';
import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import BaseIcon from '@components/Base/BaseIcon';
import { useAppDispatch, useAppSelector } from '@states/hooks';
import ButtonStyled from '@components/ButtonStyled';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import usePopup from '@hooks/usePopup';
import useConfirm from '@hooks/useConfirm';
import { increment } from '@states/counter/counterSlice';
import { useCounter } from '@states/counter/hooks';
import { useIntervalTick } from '@hooks/useInterval';
import { getRelieferBalance } from '@hooks/useReliefer';
import { contractAddress } from '@configs/contractAddress';

interface Props extends SimpleComponent {}

const WalletWrapper = styled.div`
  .icon {
    font-size: 2rem;
  }
  .icon * {
    color: #f6c343;
  }
`;

function Wallet(props: Props) {
  const token = useToken();
  const factory = contractAddress.factory;
  const { account, library } = useActiveWeb3React();
  const [ethBalance, setEthBalance] = useState<BigNumber>();
  const relieferBalance = getRelieferBalance(factory);

  const profile = useAppSelector((state) => state.profile);
  const popup = usePopup();
  const navigate = useNavigate();
  const { isConfirmed } = useConfirm();
  const dispatch = useAppDispatch();
  const counter = useCounter();
  const intervalTick = useIntervalTick(5000);

  // console.log('profile', profile);

  // get eth balance
  useEffect(() => {
    // console.log('fetch ETH');
    if (account && library) {
      library
        .getBalance(account)
        .then((balance) => {
          setEthBalance(balance);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [account, library, counter, intervalTick]);

  const getEthBalance = () => {
    if (ethBalance) {
      // return library?.utils.fromWei(ethBalance.toString(), 'ether');
      return (+ethers.utils.formatEther(ethBalance)).toFixed(4);
    }
    return '0';
  };

  const claimFaucet = async () => {
    const confirm = await isConfirmed({ text: `Confirm to get ETH FAUCET` });
    if (!confirm) return;
    try {
      popup.loading({ text: 'Loading', disable: true });
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/claim`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await popup.success({ text: 'Claim Success' });
      // dispatch(increment());
    } catch (error: any) {
      // console.log(error);
      popup.error({ text: error.response.data.message || 'Verify Failed' });
    }
  };

  return (
    <WalletWrapper className='w-[50rem] mx-auto shadow-xl'>
      <div className="p-6 rounded-lg">
        <div>
          <FaEthereum className="icon animate-bounce" />
        </div>
        <div className="mt-4 flex justify-between">
          <h1 className="text-black text-xl font-bold">ETH BALANCE</h1>
          <h1 className="text-black text-xl font-bold">{getEthBalance()}</h1>
        </div>
      </div>

      <div className="p-6 rounded-lg mt-6">
        <div>
          <BaseIcon className="animate-bounce" />
        </div>
        <div className="mt-4 flex justify-between">
          <h1 className="text-black text-xl font-bold">TOKEN BALANCE</h1>
          <h1 className="text-black text-xl font-bold">{relieferBalance}</h1>
        </div>
      </div>
    </WalletWrapper>
  );
}

export default Wallet;
