import { RiTrophyLine, RiDashboardLine, RiWalletLine } from 'react-icons/ri';
import { MdCampaign } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';


const menuListData: any[] = [
  {
    name: 'หน้าแรก',
    key: 'Dashboard',
    path: '/',
    icon: <RiDashboardLine />,
  },
  {
    name: 'กิจกรรม',
    key: 'campaign',
    path: '/campaign',
    icon: <MdCampaign />,
  },
  {
    name: 'สมาชิก',
    key: 'user',
    path: '/user',
    icon: <HiUserGroup />,
  },
  // {
  //   name: 'Leaderboard',
  //   key: 'Leaderboard',
  //   path: '/admin/Leaderboard',
  //   icon: <RiTrophyLine />,
  // },
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
