import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
  children: React.ReactNode;
}

const LayoutsContainerWrapper = styled.div``;

function LayoutsContainer(props: Props) {
  return (
    <LayoutsContainerWrapper className="bg-white min-h-screen p-6 rounded-xl">
      <div>{props.children}</div>
    </LayoutsContainerWrapper>
  );
}

export default LayoutsContainer;
