import { isAddress } from 'ethers/lib/utils';
import { Contract } from '@ethersproject/contracts';
import type { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { AddressZero } from '@ethersproject/constants';

export function addressParse(address: String, lenght = 4) {
  return address.slice(0, lenght) + '....' + address.slice(address.length - lenght, address.length);
}

export function getSigner(library: Web3Provider, account?: string) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library: Web3Provider, account?: string) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address: string, ABI: any, library: Web3Provider, account?: string) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
