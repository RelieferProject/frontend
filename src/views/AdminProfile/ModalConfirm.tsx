import usePopup from '@hooks/usePopup';
import { Checkbox, Switch } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Col, InputNumber, Row, Slider } from 'antd';
import ButtonStyled from '@components/ButtonStyled';

interface Props {
  callback: () => any;
}

const ModalConfirmWrapper = styled.div`
  .ant-switch {
    background-color: white;
  }
  .ant-switch-handle::before {
    background-color: #6c6c6c;
  }
  .ant-switch-checked ::before {
    background-color: #1890ff;
  }
`;

function ModalConfirm(props: Props) {
  const [inputValue, setInputValue] = useState(80);
  const popup = usePopup();

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  const onChangeInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const confirm = () => {
    props.callback();
    popup.success({ text: 'Copy Successfull!!!' });
  };

  return (
    <ModalConfirmWrapper className="mx-12 pt-6 border-t-2">
      <p className="text-yellow-500 mb-4 text-2xl">Investing Category</p>
      <div className="flex text-white w-full">
        <Checkbox defaultChecked>
          <div className="text-white">Mutual Fund</div>
        </Checkbox>
        <Checkbox defaultChecked>
          <div className="text-white">Flex / Fixed Saving</div>
        </Checkbox>
        <Checkbox defaultChecked>
          <div className="text-white">Saving Life Assurance</div>
        </Checkbox>
      </div>
      <p className="text-yellow-500 mt-8 text-2xl">Investing Ratio</p>
      <div className="flex mt-2 w-full text-white items-center">
        <Slider
          className="w-[20rem]"
          min={1}
          max={100}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
        <input
          className="input-blank text-2xl ml-6 mr-2 px-6 py-1 bg-white text-black focus:bg-gray-200
         hover:bg-gray-200 transition"
          value={inputValue}
          onChange={onChangeInput}
        />
        %
      </div>

      <p className="text-yellow-500 mt-8 text-2xl">Suitability Score</p>
      <p className="text-green-500 mt-2 text-2xl">Medium Risk</p>
      <div className="flex items-center mt-6">
        <span className="mr-6 text-yellow-500">Auto Coattail Strategy</span>
        <Switch defaultChecked size="small" className="bg-white" />
      </div>
      <div className="w-full grid grid-cols-1 mt-6 gap-8">
        {/* <ButtonStyled className="w-full">Cancle</ButtonStyled> */}
        <ButtonStyled onClick={confirm} className="w-full" color="secondary">
          Confirm
        </ButtonStyled>
      </div>
    </ModalConfirmWrapper>
  );
}

export default ModalConfirm;
