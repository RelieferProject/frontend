import AdminDashboard from '@views/AdminDashboard';
import AdminLeaderboard from '@views/AdminLeaderBoard';
import AdminProfile from '@views/AdminProfile';
import CampaignPage from '@views/Campaign';
import Connect from '@views/Connect';
import Home from '@views/Home';
import Test from '@views/Test';
import { createRef } from 'react';
import { Navigate } from 'react-router-dom';

const routes = [
  { path: '/', element: <AdminDashboard name="Dashboard" />, nodeRef: createRef() },
  // { path: '/*', element: <AdminDashboard name="Dashboard" />, nodeRef: createRef() },
  // { path: '/', key: 'Other', name: 'Other', element: <Navigate to="/admin/dashboard" replace /> },
  { path: '/connect', key: 'Connect', name: 'Connect Wallet', element: <Connect />, nodeRef: createRef() },
  { path: '/campaign', key: 'Connect', name: 'Campaign', element: <CampaignPage />, nodeRef: createRef() },
  // { path: '/test', key: 'Test', name: 'Test', element: <Test name="Test" />, nodeRef: createRef() },
  // { path: '/*', key: 'Other', name: 'Other', element: () => <Navigate to="/admin/dashboard" /> },

  // admin dashboard
  {
    path: '/admin/dashboard',
    key: 'AdminDashboard',
    name: 'Dashboard',
    element: <AdminDashboard name="Dashboard" />,
    nodeRef: createRef(),
  },
  {
    path: '/admin/profile',
    key: 'AdminProfile',
    name: 'Profile',
    element: <AdminProfile name="Dashboard" />,
    nodeRef: createRef(),
  },
  {
    path: '/admin/Leaderboard',
    key: 'Leaderboard',
    name: 'Leaderboard',
    element: <AdminLeaderboard name="Dashboard" />,
    nodeRef: createRef(),
  },
];

export { routes };
