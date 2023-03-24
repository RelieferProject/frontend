import menuListData from '@configs/menuListData';
import { useAppDispatch } from '@states/hooks';
import { useSideBar } from '@states/layout/hooks';
import { CLOSESIDEBAR, TOGGLESIDEBAR } from '@states/layout/reducer';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import Hamburger from 'hamburger-react';
import logo from '@assets/logo.svg';
import book from '@assets/images/book.png';
import ButtonStyled from '@components/ButtonStyled';
import { useWeb3React } from '@web3-react/core';
import { removeLocal } from '@utils/localStorage';
import useResponsive from '@utils/useResponsive';

interface Props {}

const SidebarWrapper = styled.div``;

function LayoutsSidebar(props: Props) {
  const dispatch = useAppDispatch();
  const open = useSideBar();
  const location = useLocation();
  const [state, setState] = useState(menuListData);
  const { deactivate } = useWeb3React();
  const navigate = useNavigate();
  const isMobile = useResponsive('mobileL');

  const checkRoute = (menu: any) => {
    if (menu.key === 'Dashboard') {
      return location.pathname === '/';
    } else {
      return location.pathname.includes(menu.path);
    }
  };

  const checkRouteSub = (menu: any) => {
    return menu.path.find((e: any) => location.pathname.includes(e));
  };

  const toggle = () => {
    dispatch(TOGGLESIDEBAR());
  };

  useEffect(() => {
    if (isMobile) {
      dispatch(CLOSESIDEBAR());
    }
  }, [location]);

  // if (props.isMobile) {
  //   return (
  //     <SidebarWrapper
  //       className={`font-sans flex md:hidden w-full  h-screen pt-20 fixed left-0 top-0 shadow-lg transition-all ${
  //         open ? 'translate-x-0' : 'translate-x-full'
  //       }`}
  //     >
  //       <div
  //         onClick={() => toggle()}
  //         className="w-full h-full absolute left-0 top-0 bg-black opacity-5"
  //       />
  //       <div className="absolute right-0 w-[70%] top-32 flex flex-col bg-bg-dark-100 h-full">
  //         {menuListData.map((e) => (
  //           <Link key={e.key} to={e.path}>
  //             <div
  //               className={`text-3xl font-base pl-8 py-4 transition-all flex items-center
  //       space-x-4 cursor-pointer hover:bg-blue-500 ${checkRoute(e.key) ? 'bg-blue-500' : ''}`}
  //             >
  //               {e.icon}
  //               <span>{e.name}</span>
  //             </div>
  //           </Link>
  //         ))}
  //       </div>
  //     </SidebarWrapper>
  //   );
  // }

  const logoutClick = () => {
    deactivate();
    removeLocal('isLogin');
    // navigate('/connect');
  };

  const openSubMenu = (index: number) => {
    const newMenu = state[index];
    newMenu.isOpen = !newMenu.isOpen ? true : false;
    setState([...state.slice(0, index), newMenu, ...state.slice(index + 1)]);
  };

  return (
    <SidebarWrapper
      className={`overflow-hidden z-10 h-screen flex flex-col justify-between transition-all
    fixed left-0 top-0 bg-white ${open ? '40rem md:w-[20rem]' : 'w-[5rem]'}`}
    >
      <div>
        <div
          className={`40rem md:w-[20rem] transition-all flex h-20 items-center justify-between 
      ${open ? 'px-6' : 'px-[1rem]'}`}
        >
          <div className="flex items-center">
            <Link to={'/'} className="flex items-center">
              <img className="w-12 h-12" src={logo} />
              <h1 className="ml-6 text-2xl text-text-purple font-bold">Ape Insight</h1>
            </Link>
            <div className="flex space-x-2 items-center">
              <div onClick={() => toggle()} className="">
                <Hamburger toggled={open} size={16} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`40rem md:w-[20rem] overflow-hidden 
      ${open ? 'pl-2 pr-6' : 'px-2'}`}
        >
          {state.map((e, index) =>
            !e.subMenu ? (
              <Link key={e.key} to={e.path as any}>
                <div
                  className={`mb-2 h-[4rem] relative menu-item overflow-hidden ${
                    open ? 'w-[18rem]' : 'w-[4rem]'
                  } ${checkRoute(e) ? 'menu-item-active' : 'menu-item-unactive'}`}
                >
                  <div className="w-[4rem] flex justify-center text-2xl">{e.icon}</div>
                  <p className="absolute left-[4rem]">{e.name}</p>
                </div>
              </Link>
            ) : (
              <div
                key={e.key}
                className="overflow-y-hidden transition-all"
                style={{ height: e.isOpen ? 4.5 * e.subMenu.length + 4 + 'rem' : '4rem' }}
              >
                <div
                  onClick={() => openSubMenu(index)}
                  className={`mb-2 h-[4rem] relative overflow-hidden ${
                    open ? 'w-[18rem] menu-item-sub' : 'w-[4rem] menu-item'
                  } ${
                    checkRouteSub(e)
                      ? open
                        ? 'menu-item-sub-active'
                        : 'menu-item-active'
                      : open
                      ? 'menu-item-sub-unactive'
                      : 'menu-item-sub-unactive'
                  }`}
                >
                  <div className="w-[4rem] flex justify-center text-2xl">{e.icon}</div>
                  <div className="absolute left-[4rem] flex w-full">{e.name}</div>
                  <div className={`absolute left-[14rem] flex w-full `}>
                    <Icon
                      className={`transition-all ${!e.isOpen ? '-rotate-90' : 'rotate-0'}`}
                      icon={'akar-icons:chevron-down'}
                    />
                  </div>
                </div>

                {e.subMenu.map((sub) => (
                  <Link key={sub.key} to={sub.path as any}>
                    <div
                      className={`mb-2 h-[4rem] relative menu-item overflow-hidden ${
                        open ? 'w-[18rem]' : 'w-[4rem]'
                      } ${checkRoute(sub) ? 'menu-item-active' : 'menu-item-unactive'}`}
                    >
                      <p className="absolute left-[6rem]">{sub.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )
          )}
        </div>
      </div>
      <div
        className={`40rem md:w-[20rem] mb-20 px-6 relative transition-all ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="py-4 h-[10rem] bg-text-purple mb-2 rounded-lg flex flex-col justify-end items-center relative">
          <img src={book} className="h-auto w-[10rem] object-contain absolute -top-1/2" />
          <p className="text-white">Generate Report</p>
        </div>
        <p className="text-text-gray text-base">
          Ape Insight Dashboard
          <br /> © 2022 All Rights Reserved
        </p>
        <p className="text-text-gray mt-8 text-base mb-4">Made with ♥ by Ape Insight Team</p>
        <ButtonStyled className="w-full" onClick={logoutClick}>
          {' '}
          Logout
        </ButtonStyled>
      </div>
    </SidebarWrapper>
  );
}

export default LayoutsSidebar;
