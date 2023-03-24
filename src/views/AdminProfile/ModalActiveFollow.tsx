import usePopup from '@hooks/usePopup';
import { Checkbox, Switch } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Col, InputNumber, Row, Slider } from 'antd';
import ButtonStyled from '@components/ButtonStyled';

interface Props {
  callback: () => any;
  active?: any;
}

const ModalActiveFollowWrapper = styled.div`
  .ant-switch {
    background-color: white;
  }
  .ant-switch-handle::before {
    background-color: #1890ff;
  }
`;

function ModalActiveFollow(props: Props) {
  const [inputValue, setInputValue] = useState(80);
  const popup = usePopup();

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  const onChangeInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const confirm = (val) => {
    props.callback();
    popup.success({ text: val + ' Successfull!!!' });
  };

  return (
    <ModalActiveFollowWrapper className="mx-12 pt-2">
      <div className="text-white text-2xl">
        Your current PNL: <span className="text-green-500">{props.active.valPer}</span>
      </div>

      <div className="w-full grid grid-cols-2 mt-6 gap-8">
        {/* <ButtonStyled className="w-full">Cancle</ButtonStyled> */}
        <ButtonStyled onClick={() => confirm('Follow Sell')} className="w-full" color="secondary">
          Follow Sell
        </ButtonStyled>
        <ButtonStyled onClick={() => confirm('Sell Later')} className="w-full">
          Sell Later
        </ButtonStyled>
      </div>
    </ModalActiveFollowWrapper>
  );
}

export default ModalActiveFollow;
