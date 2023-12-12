import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import { useFactoryContract } from '@hooks/useContract';
import { useFactoryGetList } from '@hooks/useFactory';
import React from 'react';
import styled from 'styled-components';
import CampaignCard from './components/CampainCard';
import ButtonStyled from '@components/ButtonStyled';
import { Link } from 'react-router-dom';

const CampaignPageWrapper = styled.div``;

const CampaignPage = () => {
  const campaignList = useFactoryGetList();

  return (
    <CampaignPageWrapper>
      <LayoutsContainer>
        <div className="flex justify-between w-full items-center">
          <h1 className="text-4xl font-bold">รายชื่อกิจกรรม</h1>
          <div className="w-[20rem]">
            <Link to="/campaign/add">
              <ButtonStyled className="w-full text-center">+ เพิ่ม กิจกรรม</ButtonStyled>
            </Link>
          </div>
        </div>
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
