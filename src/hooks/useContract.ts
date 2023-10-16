import {  useMemo } from 'react';

import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { getContract } from '@utils';
import { Web3Provider } from '@ethersproject/providers';
import { contractAddress } from '@configs/contractAddress';

// ABI
import ERC20_ABI from '@configs/abi/RelieferToken.json';
import CAMPAIGN_ABI from '@configs/abi/RelieferCampaign.json';
import FACTORY_ABI from '@configs/abi/RelieferFactory.json';
import VALIDATOR_ABI from '@configs/abi/RelieferValidate.json';

function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any,
  withSignerIfPossible = true
) {
  const { library, account } = useWeb3React<Web3Provider>();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export function useERC20Contract(address = contractAddress.token, withSignerIfPossible = true) {
  return useContract(address, ERC20_ABI, withSignerIfPossible);
}

export function useFactoryContract(address = contractAddress.factory, withSignerIfPossible = true) {
  return useContract(address, FACTORY_ABI, withSignerIfPossible);
}

export function useValidatorContract(
  address = contractAddress.validator,
  withSignerIfPossible = true
) {
  // console.log('useValidatorContract', address);
  return useContract(address, VALIDATOR_ABI, withSignerIfPossible);
}

export function useCampaignContract(address: string, withSignerIfPossible = true) {
  return useContract(address, CAMPAIGN_ABI, withSignerIfPossible);
}

export function getCampaignContract(
  address: string,
  library: Web3Provider,
  account?: string,
  withSignerIfPossible = true
) {
  return getContract(
    address,
    CAMPAIGN_ABI,
    library,
    withSignerIfPossible && account ? account : undefined
  );
}

export default useContract;
