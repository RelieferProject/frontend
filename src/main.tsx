import '@styles/tailwind.css';
import App from './App';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes.map((route) => {
      return {
        index: route.path === '/',
        path: route.path === '/' ? undefined : route.path,
        element: route.element as any,
      };
    }),
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
