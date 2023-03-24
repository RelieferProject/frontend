import { useAppDispatch, useAppSelector } from '@states/hooks';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { increment, decrement } from '@states/counter/counterSlice';

interface Props extends SimpleComponent {}

const TestWrapper = styled.div``;

function Test(props: Props) {
  const counter = useAppSelector((state) => state.counter.value);

  const dispatch = useAppDispatch();

  return (
    <TestWrapper>
      <div className="w-full flex space-x-6 text-5xl">
        <div
          onClick={() => {
            dispatch(decrement());
          }}
        >
          -
        </div>
        <div>{counter}</div>
        <div
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </div>
      </div>
    </TestWrapper>
  );
}

export default Test;
