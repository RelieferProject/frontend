// import { InjectedConnector } from '@web3-react/injected-connector';

// // let supportChain_list: any[] = [];

// export const injected = new InjectedConnector({ supportedChainIds: [supportChain_number] });

import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
// import { WalletLinkConnector } from '@web3-react/walletlink-connector';
// import { FrameConnector } from '@web3-react/frame-connector';
// import { AuthereumConnector } from '@web3-react/authereum-connector';
// import { FortmaticConnector } from '@web3-react/fortmatic-connector';
// import { PortisConnector } from '@web3-react/portis-connector';
// import { TorusConnector } from '@web3-react/torus-connector';
import getRpcUrl from '@utils/getRpcUrl';
// import { ethers } from 'ethers';

const supportChain: any = import.meta.env.VITE_APP_CHAIN_ID;
const supportChain_number = Number(supportChain);
const rpcUrl = getRpcUrl();

// const POLLING_INTERVAL = 12000;
// const RPC_URLS: { [chainId: number]: string } = {
//   1: import.meta.env.RPC_URL_1 as string,
//   4: import.meta.env.RPC_URL_4 as string,
// };

export const injected = new InjectedConnector({
  supportedChainIds: [supportChain_number],
});

export const walletconnect = new WalletConnectConnector({
  // rpc: { [supportChain_number]: rpcUrl },
  qrcode: true,
  supportedChainIds: [supportChain_number],
  // pollingInterval: POLLING_INTERVAL,
});

// export const walletlink = new WalletLinkConnector({
//   url: rpcUrl,
//   appName: 'web3-react example',
//   supportedChainIds: [supportChain_number],
// });

// export const frame = new FrameConnector({ supportedChainIds: [1] });

// export const authereum = new AuthereumConnector({ chainId: 42 });

// export const fortmatic = new FortmaticConnector({ apiKey: import.meta.env.FORTMATIC_API_KEY as string, chainId: 4 });

// export const portis = new PortisConnector({ dAppId: import.meta.env.PORTIS_DAPP_ID as string, networks: [1, 100] });

// export const torus = new TorusConnector({ chainId: 1 });
