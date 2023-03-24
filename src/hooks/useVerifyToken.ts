/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import Web3Token from 'web3-token';
import { useAppDispatch } from '@states/hooks';
import { LOGIN, LOGOUT, SETTOKEN } from '@states/profile/action';
import { useToken } from '@states/profile/hooks';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

const useVerifyToken = async () => {
  const dispatch = useAppDispatch();
  const token = useToken();
  const { account, library, deactivate } = useWeb3React();
  const location = useLocation();
  const referal = '';

  useEffect(() => {
    const generateToken = async () => {
      try {
        console.log('sign');
        const signer = library.getSigner(account);
        const token = await Web3Token.sign((msg) => signer.signMessage(msg), '1d');
        // console.log('success', token);
        await axios
          .post(`${process.env.VITE_BASE_URL}/auth/login`, {
            token,
            referal,
          })
          .then((res) => {
            dispatch(LOGIN({ token, account }));
          });
        // if (token) {
        //   dispatch(SETTOKEN(token));
        // }
        console.log(library);
      } catch (err) {
        dispatch(LOGOUT());
        deactivate();
        console.log('err');
      }
    };

    const setToken = async () => {
      if (token) {
        try {
          const verify = await Web3Token.verify(token);
          if (verify.address.toLowerCase() !== account.toLowerCase()) {
            await generateToken();
          }
        } catch {
          await generateToken();
        }
      } else {
        await generateToken();
      }
    };

    // console.log(typeof library);

    if (account && library) {
      // console.log(account);
      // dispatch(LOGIN(account));
      setToken();
    }
  }, [account, library, location]);
};

export default useVerifyToken;
