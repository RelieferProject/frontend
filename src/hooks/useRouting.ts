import { useLocation } from 'react-router-dom';
import { routes } from '../routes';

const useRouting = () => {
  const location = useLocation();

  if (location.pathname == '/') return { name: 'Dashboard' };

  return routes.find((e) => e.path === location.pathname) ?? { name: 'Other' };
};
export default useRouting;
