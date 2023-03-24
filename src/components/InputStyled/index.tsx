import React from 'react';
import { InputProps } from 'antd/lib/input/Input';
import { Input } from 'antd';

interface Props extends SimpleComponent, InputProps {}

function InputStyled(props: Props) {
  console.log(props);
  return <Input {...props} style={null} />;
}

export default InputStyled;
