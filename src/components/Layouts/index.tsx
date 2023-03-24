import useVerifyToken from '@hooks/useVerifyToken';
import { useSideBar } from '@states/layout/hooks';
import { useEagerConnect } from '@utils/web3Hooks';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import LayoutsHeader from './LayoutsHeader';
import LayoutsParticle from './LayoutsParticle';
import LayoutsSidebar from './LayoutsSidebar';

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div``;

function Layout(props: Props) {
  /* dimming-bg */
  const { active } = useWeb3React();
  const open = useSideBar();
  
  useEagerConnect();
  useVerifyToken();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!active) {
  //     navigate('/connect');
  //   }
  // }, [active]);

  // if (!active) {
  //   return (
  //     <LayoutWrapper className="min-h-screen relative">
  //       <LayoutsParticle />
  //       {props.children}
  //     </LayoutWrapper>
  //   );
  // }

  return (
    <LayoutWrapper className="min-h-screen relative">
      {/* <LayoutsParticle /> */}
      <LayoutsHeader />
      <div
        className={`relative transition-all min-h-screen w-full pt-[7rem] pr-8 ${
          open ? 'md:pl-[23rem] pl-[8rem]' : 'pl-[8rem]'
        }`}
      >
        {props.children}
      </div>
      <LayoutsSidebar />
      {/* <LayoutsSidebar isMobile={true} /> */}
    </LayoutWrapper>
  );
}

export default Layout;
