import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import { useFactoryContract } from '@hooks/useContract';
import { useFactoryGetList } from '@hooks/useFactory';
import React from 'react';
import styled from 'styled-components';
import CampaignCard from './components/CampainCard';

const CampaignPageWrapper = styled.div``;

const CampaignPage = () => {
  const campaignList = useFactoryGetList();

  return (
    <CampaignPageWrapper>
      <LayoutsContainer>
        <h1 className='text-4xl font-bold'>Campaings List</h1>
        <div className="w-full flex flex-wrap justify-start gap-4 mt-6">
          {campaignList.map((item, index) => {
            return <CampaignCard data={item} key={item.address} />;
          })}
        </div>
      </LayoutsContainer>
    </CampaignPageWrapper>
  );
};

export default CampaignPage;
