import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Wallet from './Wallet';

interface Props extends SimpleComponent {}

const AdminDashboardWrapper = styled.div``;

function AdminDashboard(props: Props) {
  const [active, setActive] = useState(true);



  return (
    <AdminDashboardWrapper className="w-fulll pb-20">
        <Wallet />
    </AdminDashboardWrapper>
  );
}

export default AdminDashboard;
