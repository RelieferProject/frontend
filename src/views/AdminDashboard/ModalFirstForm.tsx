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

const ModalFirstFormWrapper = styled.div`
  .ant-switch {
    background-color: white;
  }
  .ant-switch-handle::before {
    background-color: #1890ff;
  }
`;

function ModalFirstForm(props: Props) {
  const [inputValue, setInputValue] = useState('24,000');
  const popup = usePopup();

  const onChangeInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const confirm = (val) => {
    props.callback();
    popup.success({ text: val });
  };

  return (
    <ModalFirstFormWrapper className="mx-8 px-20 pt-4 border-t-2 border-t-text-purple">
      <div className="mb-2">
        <label className="text-yellow-500 font-semibold text-2xl">Monthly Income Based</label>
        <input
          className="input-blank text-3xl ml-6 mr-2 px-6 py-1 rounded-lg bg-gray-100 text-black focus:bg-gray-200
         hover:bg-gray-200 transition"
          value={inputValue}
          onChange={onChangeInput}
        />
        <label className="text-yellow-500 font-semibold text-2xl">THB</label>
      </div>

      <div className="text-2xl text-blue-500 font-semibold">
        <label className="text-white font-semibold text-2xl mr-4">Risk / Suitability Score</label>
        Medium Risk
      </div>

      <div className="w-full grid grid-cols-2 mt-6 gap-8">
        {/* <ButtonStyled className="w-full">Cancle</ButtonStyled> */}
        <ButtonStyled
          onClick={() => confirm('Successfull Let start copy!! ')}
          className="w-full"
          color="secondary"
        >
          Access
        </ButtonStyled>
        <ButtonStyled onClick={() => confirm('Successfull Let start copy!! ')} className="w-full">
          Cancel
        </ButtonStyled>
      </div>
    </ModalFirstFormWrapper>
  );
}

export default ModalFirstForm;
