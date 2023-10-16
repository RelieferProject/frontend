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
import { parseEther } from 'ethers/lib/utils';
import { getRelieferBalance } from '@hooks/useReliefer';

const CampaignCardWrapper = styled.div``;

const CampaignCard = ({ data }: { data: CampaignInterface }) => {
  const { isConfirmed } = useConfirm();
  const popup = usePopup();
  const factoryContract = useCampaignContract(data.address);
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();

  const startJoinCampaign = async () => {
    const confirm = await isConfirmed({ text: `Confirm to Start ${data.name}` });
    if (confirm) {
      popup.loading({ text: 'Start Campaign...' });
      try {
        const result = await factoryContract.startJoinCampaign();
        await result.wait();
        popup.success({ text: 'Start Campaign Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.data?.message || 'Start Campaign Failed' });
        dispatch(increment());
      }
    }
  };

  const endJoinCampaign = async () => {
    const confirm = await isConfirmed({ text: `Confirm to END joining ${data.name}` });
    if (confirm) {
      popup.loading({ text: 'END joining...' });
      try {
        const result = await factoryContract.endJoinCampaign();
        await result.wait();
        popup.success({ text: 'END joining Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.data?.message || 'END joining Failed' });
        dispatch(increment());
      }
    }
  };

  const startCampaign = async () => {
    const confirm = await isConfirmed({ text: `Confirm to Start count duration ${data.name}` });
    if (confirm) {
      popup.loading({ text: 'Start count duration...' });
      try {
        const result = await factoryContract.startCampaign();
        await result.wait();
        popup.success({ text: 'END Start count duration Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.data?.message || 'END Start count duration Failed' });
        dispatch(increment());
      }
    }
  };

  const endCampaign = async () => {
    const confirm = await isConfirmed({ text: `Confirm to end campaign ${data.name}` });
    if (confirm) {
      popup.loading({ text: 'end campaign...' });
      try {
        const result = await factoryContract.endCampaign();
        await result.wait();
        popup.success({ text: 'end campaign Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.data?.message || 'end campaign Failed' });
        dispatch(increment());
      }
    }
  };

  const calculateCampaign = async () => {
    const confirm = await isConfirmed({ text: `Confirm to calculate reward ${data.name}` });
    if (confirm) {
      popup.loading({ text: 'calculate reward ...' });
      try {
        const result = await factoryContract.calculateCampaign();
        await result.wait();
        const totalTokenAmount = await factoryContract.totalTokenAmount();
        totalTokenAmount.toString();
        popup.success({ text: `calculate reward  Success : ${totalTokenAmount.toString()} token` });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.data?.message || 'calculate reward  Failed' });
        dispatch(increment());
      }
    }
  };

  const mintReward = async () => {
    const confirm = await isConfirmed({ text: `Confirm mint reward ${data.name}` });
    if (confirm) {
      popup.loading({ text: 'mintReward...' });
      try {
        const result = await factoryContract.mintReward();
        await result.wait();
        popup.success({ text: 'mintReward Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.data?.message || 'mintReward Failed' });
        dispatch(increment());
      }
    }
  };

  const relieferBalance = getRelieferBalance(data.address);

  return (
    <CampaignCardWrapper className="flex flex-col gap-4 p-4 pt-6 rounded-md border-2 relative border-secondary2 bg-white shadow-lg w-[40rem]">
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
        <b>RELIEFER BALANCE {}</b>
        {relieferBalance}
      </div>

      

      <div>
        <b>RELIEFER ALL BALANCE {}</b>
        {data.totalTokenAmount.toString()}
      </div>

      <div>
        <b>Name: {}</b>
        {data.name}
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
        {/* <ButtonStyled onClick={joinCampain} color="secondary" className="text-center w-full">
          JOIN
        </ButtonStyled> */}
        {data.owner.toLowerCase() === account.toLowerCase() && data.status === 'NOTSTARTED' && (
          <ButtonStyled
            onClick={startJoinCampaign}
            color="secondary"
            className="text-center w-full"
          >
            Start joining campaign
          </ButtonStyled>
        )}

        {data.owner.toLowerCase() === account.toLowerCase() && data.status === 'START_JOIN' && (
          <ButtonStyled onClick={endJoinCampaign} color="secondary" className="text-center w-full">
            End joining campaign
          </ButtonStyled>
        )}

        {data.owner.toLowerCase() === account.toLowerCase() && data.status === 'END_JOIN' && (
          <ButtonStyled onClick={startCampaign} color="secondary" className="text-center w-full">
            Start Campaign count duration campaign
          </ButtonStyled>
        )}

        {data.owner.toLowerCase() === account.toLowerCase() &&
          data.status === 'STARTED_CAMPAIGN' && (
            <ButtonStyled onClick={endCampaign} color="secondary" className="text-center w-full">
              End campaign
            </ButtonStyled>
          )}

        {data.owner.toLowerCase() === account.toLowerCase() && data.status === 'END_CAMPAIGN' && (
          <ButtonStyled
            onClick={calculateCampaign}
            color="secondary"
            className="text-center w-full"
          >
            Calculate Reward
          </ButtonStyled>
        )}

        {data.owner.toLowerCase() === account.toLowerCase() && data.status === 'SUCCESS' && (
          <ButtonStyled onClick={mintReward} color="secondary" className="text-center w-full">
            Mint Reward
          </ButtonStyled>
        )}
      </div>
    </CampaignCardWrapper>
  );
};

export default CampaignCard;
