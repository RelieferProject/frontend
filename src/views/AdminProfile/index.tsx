import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Activity from './Activity';
import AssetAllocation from './AssetAllocation';
import AssetHolding from './AssetHolding';
import AssetPnl from './AssetPnl';
import ProfileDetails from './ProfileDetails';

interface Props extends SimpleComponent {}

const AdminProfileWrapper = styled.div``;

function AdminProfile(props: Props) {
  return (
    <AdminProfileWrapper className="w-fulll pb-20">
      <div className="w-full grid grid-cols-4 gap-8 items-start">
        <ProfileDetails />
        <AssetHolding />
      </div>
      <div className="w-full grid grid-cols-5 gap-8 mt-8 items-start">
        <AssetPnl />
        <AssetAllocation />

        <Activity />
      </div>
    </AdminProfileWrapper>
  );
}

export default AdminProfile;
