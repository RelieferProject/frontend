import { useState, useEffect } from 'react';
import { getLocal } from '@utils/localStorage';
// import { useWallet } from '@binance-chain/bsc-use-wallet';
import { useWeb3React } from '@web3-react/core';
import { injected } from '@utils/connectors';

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (getLocal('isLogin')) {
        activate(injected).catch((err) => {
          console.log(err);
          setTried(true);
        });
      } else {
        console.log('err');
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React();

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}

interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

declare const window: any;

export function useSwitchChain() {
  useEffect(() => {
    try {
      const { ethereum } = window;
      let Chain = import.meta.env.VITE_APP_CHAIN_ID;
      let networkData: [AddEthereumChainParameter];
      if (Chain === '97') {
        //bsctestnet
        networkData = [
          {
            chainId: '0x61',
            chainName: 'BSCTESTNET',
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
            nativeCurrency: {
              name: 'BINANCE COIN',
              symbol: 'BNB',
              decimals: 18,
            },
            blockExplorerUrls: ['https://testnet.bscscan.com/'],
          },
        ];
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: networkData,
        });
      } else {
        networkData = [
          {
            chainId: '0x38',
            chainName: 'BSCMAINET',
            rpcUrls: ['https://bsc-dataseed1.binance.org'],
            nativeCurrency: {
              name: 'BINANCE COIN',
              symbol: 'BNB',
              decimals: 18,
            },
            blockExplorerUrls: ['https://testnet.bscscan.com/'],
          },
        ];
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: networkData,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
}

export const switchChainFunction = async () => {
  let Chain = import.meta.env.VITE_APP_CHAIN_ID;
  let networkData: [AddEthereumChainParameter];

  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    if (Chain === '97') {
      //bsctestnet
      networkData = [
        {
          chainId: '0x61',
          chainName: 'BSCTESTNET',
          rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
          nativeCurrency: {
            name: 'BINANCE COIN',
            symbol: 'BNB',
            decimals: 18,
          },
          blockExplorerUrls: ['https://testnet.bscscan.com/'],
        },
      ];
      return window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: networkData,
      });
    } else if (Chain === '56') {
      networkData = [
        {
          chainId: '0x38',
          chainName: 'BSCMAINET',
          rpcUrls: ['https://bsc-dataseed1.binance.org'],
          nativeCurrency: {
            name: 'BINANCE COIN',
            symbol: 'BNB',
            decimals: 18,
          },
          blockExplorerUrls: ['https://testnet.bscscan.com/'],
        },
      ];
      return window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: networkData,
      });
    }
  }

  // try {
  //   await window.ethereum.request({
  //     method: 'wallet_switchEthereumChain',
  //     params: [{ chainId: import.meta.env.VITE_APP_CHAIN_ID_HEX }],
  //   });
  // } catch (err) {
  //   console.log('add network');
  // }
};

export const useReconnect = () => {
  const [activatingConnector, setActivatingConnector] = useState<any>();
  const context = useWeb3React();
  const { connector } = context;
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager && !!activatingConnector);
};
