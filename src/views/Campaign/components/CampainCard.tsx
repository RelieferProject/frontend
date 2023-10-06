import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import { useCampaignContract, useFactoryContract } from '@hooks/useContract';
import { CampaignInterface, useFactoryGetList } from '@hooks/useFactory';
import { addressParse } from '@utils';
import React from 'react';
import styled from 'styled-components';
import Image from 'react';
import ButtonStyled from '@components/ButtonStyled';
import useConfirm from '@hooks/useConfirm';
import usePopup from '@hooks/usePopup';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from '@states/hooks';
import { increment } from '@states/counter/counterSlice';
import { useCounter } from '@states/counter/hooks';

const CampaignCardWrapper = styled.div``;

const CampaignCard = ({ data }: { data: CampaignInterface }) => {
  const { isConfirmed } = useConfirm();
  const popup = usePopup();
  const factoryContract = useCampaignContract(data.address);
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();

  const joinCampain = async () => {
    const confirm = await isConfirmed({ text: `Confirm to Join ${data.address}` });
    if (confirm) {
      try {
        await factoryContract.user_joinCampaign();
        popup.success({ text: 'Join Campaign Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.data.message });
      }
    }
  };

  const campainger_start = async () => {
    const confirm = await isConfirmed({ text: `Confirm to Start ${data.address}` });
    if (confirm) {
      popup.loading({ text: 'Start Campaign...' });
      try {
        await factoryContract.startJoinCampaign();
        popup.success({ text: 'Start Campaign Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.data?.message || 'Start Campaign Failed' });
        dispatch(increment());
      }
    }
  };

  return (
    <CampaignCardWrapper className="flex flex-col gap-4 p-4 pt-6 rounded-md border-2 relative border-secondary2 bg-white shadow-lg w-[30rem]">
      <div>
        <img
          src={'/src/assets/images/avatar/fox.svg'}
          className="h-auto w-[3rem] object-contain absolute top-2 right-2"
        />
      </div>
      <div>
        <b>Address: {}</b>
        {addressParse(data.address)}
      </div>
      <div>
        <b>Status: </b>
        <span>{data.status}</span>
      </div>
      <div>
        <b>Start Time: </b>
        <span className="text-md">
          {new Date(+data.startTime).toLocaleDateString()} :{' '}
          {new Date(+data.startTime).toLocaleTimeString()}
        </span>
      </div>

      <div>
        <b>End Time: </b>
        <span className="text-md">
          {new Date(+data.endTime).toLocaleDateString()} :{' '}
          {new Date(+data.endTime).toLocaleTimeString()}
        </span>
      </div>

      <div>
        <b>User : </b>
        <span>
          {data.users.length} / {data.maxUser.toString()}
        </span>
      </div>
      <div className="flex justify-center gap-2">
        <ButtonStyled onClick={joinCampain} color="secondary" className="text-center w-full">
          JOIN
        </ButtonStyled>
        {data.owner.toLowerCase() === account.toLowerCase() && data.status === 'NOTSTARTED' && (
          <ButtonStyled onClick={campainger_start} color="secondary" className="text-center w-full">
            START
          </ButtonStyled>
        )}
      </div>
    </CampaignCardWrapper>
  );
};

export default CampaignCard;
