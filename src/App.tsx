import Layout from '@components/Layouts';
import GlobalStyle from '@styles/globalStyle';
import React from 'react';
import { Route, Routes, useLocation, useOutlet } from 'react-router-dom';
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group';

import Test from '@views/Test';
import PopupBar from '@components/Popup';
import ConfirmModal from '@components/ConfirmModal';
import { routes } from './routes';
import Providers from '@providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <Providers>
      <GlobalStyle />
      <PopupBar />
      <ConfirmModal />
      <ToastContainer />
      <Layout>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef as React.RefObject<HTMLDivElement>} className="fade">
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Layout>
    </Providers>
  );
}

export default App;
