import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import { useFactoryContract } from '@hooks/useContract';
import { CampaignInterface, useFactoryGetList } from '@hooks/useFactory';
import { addressParse } from '@utils';
import React from 'react';
import styled from 'styled-components';
import Image from 'react';

const CampaignCardWrapper = styled.div``;

const CampaignCard = ({ data }: { data: CampaignInterface }) => {
  return (
    <CampaignCardWrapper className="flex flex-col gap-4 p-4 pt-6 rounded-md border-2 relative border-secondary2 bg-white shadow-lg w-[30rem]">
      <div>
        <img
          src={'/src/assets/images/avatar/fox.svg'}
          className="h-auto w-[3rem] object-contain absolute top-2 right-2"
        />
      </div>
      <div>
        <b>Address: </b>
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
    </CampaignCardWrapper>
  );
};

export default CampaignCard;
