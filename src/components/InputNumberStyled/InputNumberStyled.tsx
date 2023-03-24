import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';

interface Props extends SimpleComponent, InputNumberProps {}

function InputNumberStyled(props: Props) {
  console.log(props);
  return (
    <InputNumber
      {...props}
      style={{ width: '100%' }}
      className="custom-input-div"
      controls={false}
    />
  );
}

export default InputNumberStyled;
