import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props extends SimpleComponent {}

const AdminProfileWrapper = styled.div``;

function AdminProfile(props: Props) {
  return <AdminProfileWrapper className="w-fulll pb-20"></AdminProfileWrapper>;
}

export default AdminProfile;
