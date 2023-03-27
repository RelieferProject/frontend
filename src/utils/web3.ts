// import Web3 from 'web3';

// declare let window: any;

// window.ethereum.request({ method: 'eth_requestAccounts' });

// const web3 = new Web3(window.ethereum);

// export default web3;

import Web3 from 'web3';
import getRpcUrl from './getRpcUrl';

declare const window: any;

let web3: Web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  let rpcUrl = getRpcUrl();
  const provider = new Web3.providers.HttpProvider(rpcUrl);
  web3 = new Web3(provider);
}

export default web3;
