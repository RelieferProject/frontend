import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props extends SimpleComponent {}

const HomeWrapper = styled.div``;

function Home(props: Props) {
  return (
    <HomeWrapper>
      <LayoutsContainer>Test</LayoutsContainer>
    </HomeWrapper>
  );
}

export default Home;
