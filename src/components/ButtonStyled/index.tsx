import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import styled from 'styled-components';

const ButtonStyledWrapper = styled.div<{ theme: string; disabled: boolean }>`
  position: relative;

  * {
    color: white;
  }

  ${({ theme, disabled }) => {
    return !disabled
      ? theme === 'secondary'
        ? 'background: linear-gradient(90deg, #5364c9 0%, #64479c 100%);'
        : 'background: linear-gradient(90deg, #a200ff 0%, #ff7c6e 100%);'
      : 'background-color: #829aa6;';
  }}

  overflow: hidden;
  transition: all 0.3s ease-in-out;
  :hover {
    * {
      transition: all 0.3s ease-in-out;
      ${({ disabled }) => {
        return !disabled ? 'color: #000000;' : '';
      }}
    }
    .overlay {
      ${({ theme }) => {
        return theme === 'secondary' ? 'transform: translateY(0);' : 'transform: translateX(0);';
      }}
    }
  }
  button {
    padding: 1rem 0;
    position: relative;
  }
  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: all 0.3s ease-in-out;
    transform: translateY(100%);
    ${({ theme, disabled }) => {
      return !disabled
        ? theme === 'secondary'
          ? 'background: linear-gradient(0deg, #00d3c5 0%, #734ae8 100%);'
          : 'background: linear-gradient(90deg, #a200ff 0%, #ff7c6e 100%);'
        : 'background-color: transparent;';
    }}
    ${({ theme }) => {
      return theme === 'secondary'
        ? 'transform: translateY(101%);'
        : 'transform: translateX(-101%);';
    }}
  }
`;

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  onClick?: (e: any) => any;
  children: React.ReactNode;
  disabled?: boolean;
  tone?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: any;
  color?: 'primary' | 'secondary' | string;
}

function ButtonStyled({
  className,
  disabled,
  onClick,
  style,
  color,
  children,
  type,
  loading,
  ...others
}: Props) {
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      console.log('enter press here! ');
    }
  };

  console.log(disabled);

  return (
    <ButtonStyledWrapper
      className={'w-full text-xl relative rounded-lg overflow-hidden cursor-pointer font-bold'}
      theme={color}
      style={style}
      disabled={disabled || loading}
    >
      <div className="overlay"></div>
      <button
        onClick={onClick}
        className={className || ''}
        disabled={disabled || loading}
        type={type}
        {...others}
      >
        {loading ? <AiOutlineLoading className="animate-spin mx-auto" /> : children}
      </button>
    </ButtonStyledWrapper>
  );
}

export default ButtonStyled;
