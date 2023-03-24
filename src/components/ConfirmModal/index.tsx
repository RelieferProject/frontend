import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { AiOutlineClose } from 'react-icons/ai';
import useConfirm from '@hooks/useConfirm';
import { BsCheckCircleFill } from 'react-icons/bs';
import styled from 'styled-components';
import InputStyled from '@components/InputStyled';
import ButtonStyled from '@components/ButtonStyled';

const StyledModalContainer = styled.div`
  z-index: 100;
  .icon {
    font-size: 4rem;
    margin: 3rem auto;
  }
`;

const ConfirmModal = () => {
  const { state, confirm, setConfirm } = useConfirm();
  const valueToset = state.value;

  const [value, setValue] = useState('');

  const onChangeValue = (e) => {
    if (state.type === 'number') {
      if (Number(e.target.value) >= 0) {
        if (state.max) {
          if (Number(e.target.value) <= state.max) {
            setValue(e.target.value);
          }
        } else {
          setValue(e.target.value);
        }
      }
    } else {
      setValue(e.target.value);
    }
  };

  const onconfirm = () => {
    confirm.proceed({ confirm: true, value });
    setConfirm({ ...confirm, isOpen: false });
  };

  const onreject = () => {
    confirm.cancel({ confirm: false });
    setConfirm({ ...confirm, isOpen: false });
  };

  useEffect(() => {
    if (confirm.isOpen) {
      setValue(valueToset);
    }
  }, [confirm.isOpen]);

  return (
    <React.Fragment>
      <CSSTransition in={confirm.isOpen} timeout={200} classNames="fade" unmountOnExit mountOnEnter>
        <StyledModalContainer className="fixed top-0 left-0 h-screen w-screen">
          <div
            className="w-full h-full bg-black bg-opacity-60 absolute left-0 top-0"
            onClick={onreject}
          />
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-between w-[40rem] h-[30rem] p-4 rounded-md bg-bg-dark-medium border-2 border-secondary1`}
          >
            <div
              onClick={onreject}
              className="absolute right-3 top-3 text-3xl w-10 h-10 transition-all flex items-center justify-center rounded-md hover:bg-bg-dark-light"
            >
              <AiOutlineClose />
            </div>
            <h1 className="text-4xl border-b-2 border-bg-dark-light pb-5 my-4">
              {state.title ? state.title : 'Confirmation'}
            </h1>
            <div className="flex flex-col h-full justify-between">
              <div className="mt-10">
                {!state.input && (
                  <div className="flex items-center justify-center">
                    <BsCheckCircleFill className="icon" />
                  </div>
                )}

                {state.text && <div className="text-3xl text-center text-white">{state.text}</div>}

                {state.input && (
                  <div className="flex mt-5 w-[90%] mx-auto">
                    <InputStyled
                      type={state.type}
                      style={{ width: '100%', fontSize: '3rem' }}
                      value={value}
                      onChange={onChangeValue}
                      maxLength={state.max || null}
                    />
                  </div>
                )}
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <ButtonStyled
                  className={`w-full text-3xl ${state.noCancel && 'col-span-2'}`}
                  onClick={onconfirm}
                  color={'secondary'}
                  disabled={state.input ? value === '' : false}
                >
                  Confirm
                </ButtonStyled>
                {!state.noCancel && (
                  <ButtonStyled onClick={onreject} className={`w-full text-3xl`} color={'primary'}>
                    Cancel
                  </ButtonStyled>
                )}
              </div>
            </div>
          </div>
        </StyledModalContainer>
      </CSSTransition>
    </React.Fragment>
  );
};
export default ConfirmModal;
