import styled from 'styled-components';
import { useAppDispatch } from '@states/hooks';
import { TOGGLESIDEBAR } from '@states/layout/reducer';
import { Squash as Hamburger } from 'hamburger-react';
import { useSideBar } from '@states/layout/hooks';
import { BiSearch } from 'react-icons/bi';
import { Icon } from '@iconify/react';
import useRouting from '@hooks/useRouting';
import { addressParse } from '@utils';
import { useWeb3React } from '@web3-react/core';
import MonkeySvg from '@assets/images/avatar/monkey.svg';
import ButtonStyled from '@components/ButtonStyled';
import { Link } from 'react-router-dom';
import ConnectWalletBtn from '@components/ConnectWalletBtn';

interface Props {}

const HeaderWrapper = styled.div``;

function LayoutsHeader(props: Props) {
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();
  const open = useSideBar();
  const toggle = () => {
    dispatch(TOGGLESIDEBAR());
  };

  const routing = useRouting();
  return (
    <HeaderWrapper
      className={`transition-all z-10 ${
        open ? 'pl-[20rem]' : 'pl-[5rem]'
      } pr-4 font-sans fixed bg-white top-0 left-0 w-screen h-20 flex items-center justify-between`}
    >
      <div className="min-w-[12rem] flex items-center">
        <div className="flex space-x-2 items-center">
          <div
            onClick={() => toggle()}
            className={`transition-all ${open ? 'opacity-0' : 'opacity-100'}`}
          >
            <Hamburger toggled={open} size={16} />
          </div>
        </div>
        <h1 className="text-2xl text-bold text-text-purple">{routing.name}</h1>
      </div>

      <div className="flex items-center justify-end h-full py-4">
        {/* <div className="hidden md:flex items-center space-x-4 mr-10">
          <form className="bg-gray-100 rounded-md flex items-center py-2 px-6">
            <BiSearch className="fill-gray-600" />
            <input
              className="input-blank text-xl ml-6 px-6 py-1 bg-transparent focus:bg-gray-200
         hover:bg-gray-200 transition"
              placeholder="Search here"
            />
          </form>
          <div className="icon-box icon-box-active">
            <Icon icon={'uil:bell'} className="icon" />
          </div>
          <div className="icon-box">
            <Icon icon={'mdi:message-text-outline'} className="icon" />
          </div>
          <div className="icon-box">
            <Icon icon={'bytesize:gift'} className="icon" />
          </div>
        </div> */}
        <ConnectWalletBtn />
        {/* <div className=" p-1 h-full rounded-xl">
          <img className="w-full h-full object-contain" src={MonkeySvg} />
        </div>
        <div className="ml-4 flex flex-col">
          <p className="text-xl">Ape Master</p>
          <span className="text-base text-text-gray">Super Admin</span>
        </div> */}
      </div>
      {/* <div className="flex space-x-2 items-center">
        <div onClick={() => toggle()} className="md:hidden w-[5rem]">
          <Hamburger toggled={open} size={20} />
        </div>
      </div> */}
    </HeaderWrapper>
  );
}

export default LayoutsHeader;
