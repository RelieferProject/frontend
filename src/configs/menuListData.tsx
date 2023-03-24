import { RiTrophyLine, RiDashboardLine, RiWalletLine } from 'react-icons/ri';

const menuListData: any[] = [
  {
    name: 'Dashboard',
    key: 'Dashboard',
    path: '/',
    icon: <RiDashboardLine />,
  },
  {
    name: 'Profile',
    key: 'profile',
    path: '/admin/profile',
    icon: <RiWalletLine />,
  },
  {
    name: 'Leaderboard',
    key: 'Leaderboard',
    path: '/admin/Leaderboard',
    icon: <RiTrophyLine />,
  },
  // {
  //   name: 'My Wallet',
  //   key: 'mywallet',
  //   path: ['/admin/wallet'],
  //   icon: <RiWalletLine />,
  //   isOpen: false,
  //   subMenu: [
  //     {
  //       name: 'Add new',
  //       key: 'addnew',
  //       path: '/admin/wallet/add',
  //     },
  //     {
  //       name: 'Card List',
  //       key: 'cardList',
  //       path: '/admin/wallet/card',
  //     },
  //   ],
  // },
  // {
  //   name: 'Crypto',
  //   key: 'crypto',
  //   path: ['/crypto'],
  //   icon: <RiBitCoinLine />,
  //   isOpen: false,
  //   subMenu: [
  //     {
  //       name: 'Details',
  //       key: 'Details',
  //       path: '/crypto/detail',
  //     },
  //     {
  //       name: 'Staking',
  //       key: 'Staking',
  //       path: '/crypto/staking',
  //     },
  //   ],
  // },
];

export default menuListData;
