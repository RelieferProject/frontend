import { useCounter } from '@states/counter/hooks';
import useActiveWeb3React from './useActiveWeb3React';
import { useCallback, useEffect, useState } from 'react';
import { useERC20Contract } from './useContract';
import { ethers } from 'ethers';

export const getRelieferBalance = (address = undefined) => {
  const erc20Contract = useERC20Contract();
  const { account, active, library } = useActiveWeb3React();
  const [balance, setBalance] = useState<string>('0');
  const count = useCounter();

  const getBalance = useCallback(async () => {
    if (erc20Contract) {
      const balance = await erc20Contract.balanceOf(address || account);
      const balanceParse = (+ethers.utils.formatEther(balance)).toFixed(4);
      setBalance(balanceParse);
    }
  }, [account, active, library, count]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return balance;
};
