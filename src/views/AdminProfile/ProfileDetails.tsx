import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Icon } from '@iconify/react';
import { useWeb3React } from '@web3-react/core';
import { addressParse } from '@utils';
import ButtonStyled from '@components/ButtonStyled';
import MonkeySvg from '@assets/images/avatar/monkey.svg';
import useConfirm from '@hooks/useConfirm';
import usePopup from '@hooks/usePopup';
import ModalPopup from '@components/ModalPopup/ModalPopup';
import ModalConfirm from './ModalConfirm';
import { toast } from 'react-toastify';

interface Props {}

const ProfileDetailsWrapper = styled.div`
  .icon-social {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    ${tw`border-bg-purple-card border flex justify-center items-center transition-all cursor-pointer`}
  }
  .icon-social * {
    color: white;
    font-size: 1.4rem;
    ${tw`text-bg-purple-card`}
  }
  .icon-social:hover {
    * {
      color: white;
    }
    ${tw`bg-bg-purple-card `}
  }
`;

function ProfileDetails(props: Props) {
  // const { account } = useWeb3React();
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const popup = usePopup();

  const social = [
    {
      value: '098343411',
      icon: <Icon icon="bi:telephone" />,
    },
    {
      value: 'test@gmail.com',
      icon: <Icon icon="carbon:email" />,
    },
    {
      value: '098343411',
      icon: <Icon icon="bxl:facebook" />,
    },
  ];

  const onClickSubmit = async () => {
    if (state) {
      setState(false);
    } else {
      setOpen(true);
    }
  };

  let timer;

  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        toast.info('Ape Insight Alert!!! Your Master #4428 has sold the investment unit');
      }, 10000);
  };

  useEffect(() => {
    // toast.info('Ape Insight Alert!!! Your Master #4428 has sold the investment unit');
    // updateCount();
    // return () => clearInterval(timer);
  }, []);

  return (
    <ProfileDetailsWrapper
      className={`border-3 col-span-2 lg:col-span-1 ${
        state ? 'border-animation' : ''
      }  py-6 px-6 bg-white shadow-lg rounded flex flex-col items-center`}
    >
      <ModalPopup
        title="Wealth Asset Management Setting (Copy Asset)"
        show={open}
        onClose={() => setOpen(false)}
      >
        <ModalConfirm
          callback={() => {
            setOpen(false);
            setState(true);
          }}
        />
      </ModalPopup>
      <div className="flex w-full justify-between items-center">
        <h2 className="text-black text-2xl">My Profile</h2>
        <Icon icon={'carbon:overflow-menu-vertical'} />
      </div>
      <img className="w-[80%] mx-auto h-auto my-4 object-contain" src={MonkeySvg} />
      <h1 className="text-text-purple font-semibold text-2xl">Ape Master</h1>
      {/* <p className="text-base mb-2">{account ? addressParse(account) : ''}</p> */}
      <p className="text-base text-center text-text-gray mb-4">Join on 24 March 2022 Ranking: 78</p>
      <ButtonStyled
        onClick={onClickSubmit}
        color="secondary"
        className="w-full text-2xl flex justify-center items-center"
      >
        {!state ? (
          <Icon icon={'icon-park-outline:write'} className="mr-4 text-2xl" />
        ) : (
          <Icon icon={'line-md:downloading-loop'} className="mr-4 text-2xl" />
        )}
        {!state ? 'COPY ASSET' : 'Copying...'}
      </ButtonStyled>
      <div className="mt-8 mb-2 flex gap-2 justify-center flex-wrap">
        {social.map((e) => (
          <div className="icon-social">{e.icon}</div>
        ))}
      </div>
    </ProfileDetailsWrapper>
  );
}

export default ProfileDetails;
