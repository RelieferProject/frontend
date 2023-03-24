import PopupContext from '@providers/Popup';
import React from 'react';
import { useContext } from 'react';
import styled, { useTheme } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import { BiError } from 'react-icons/bi';
import ButtonStyled from '@components/ButtonStyled';

const StyledModalContainer = styled.div<{ tone: string }>`
  z-index: 100;
  .icon {
    font-size: 4rem;
    margin: 3rem auto;
  }
  .icon-white * {
    color: white;
  }
`;

const PopupBar = () => {
  const popupCtx = useContext(PopupContext);

  const closeModal = () => {
    if (!popupCtx.content.disable) {
      popupCtx.clear();
      if (popupCtx.content.callBack) {
        popupCtx.content.callBack();
      }
    }
  };

  const ico = {
    loading: <AiOutlineLoading3Quarters className="icon icon-white animate-spin" color="white" />,
    success: <BsCheckCircleFill className="icon icon-white" color="white" />,
    error: <BiError className="icon icon-white" color="white" />,
  };

  return (
    <React.Fragment>
      <CSSTransition
        in={Boolean(popupCtx.popup)}
        timeout={200}
        classNames="fade"
        unmountOnExit
        mountOnEnter
      >
        <StyledModalContainer className="fixed top-0 left-0 h-screen w-screen" tone={popupCtx.tone}>
          <div
            className="w-full h-full bg-black bg-opacity-60 absolute left-0 top-0"
            onClick={closeModal}
          />
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-between w-[40rem] h-[30rem] p-4 rounded-md bg-bg-dark-medium border-2 border-${popupCtx.tone}1`}
          >
            <div
              onClick={closeModal}
              className="absolute right-3 top-3 text-3xl w-10 h-10 icon-white transition-all flex items-center justify-center rounded-md hover:bg-bg-dark-light"
            >
              <AiOutlineClose />
            </div>
            {popupCtx.content.title && (
              <h1 className="text-4xl border-b-2 border-bg-dark-light pb-3">
                {popupCtx.content.title}
              </h1>
            )}
            <div>
              {ico[popupCtx.content.type]}
              <div className="text-3xl text-center text-white">{popupCtx.content.text}</div>
            </div>
            <div>
              <ButtonStyled className="w-full text-3xl" color={popupCtx.tone} onClick={closeModal}>
                Confirm
              </ButtonStyled>
            </div>
          </div>
        </StyledModalContainer>
      </CSSTransition>
    </React.Fragment>
  );
};
export default PopupBar;
