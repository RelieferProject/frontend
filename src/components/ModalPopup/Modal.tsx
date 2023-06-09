import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
// import { enableScroll } from 'utils/scrollBody';

const ModalWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  height: calc(100vh - 6rem);
  position: fixed;
  left: 0;
  top: 6rem;
  background-color: transparent;
  z-index: 90;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2rem;
  .bg_dark {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    top: 0;
    left: 0;
    opacity: 0.4;
    transition: all 0.5s;
    z-index: 1;
  }
  .content_wrapper {
    position: relative;
    z-index: 2;
  }
  .exit_btn {
    font-size: 20px;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    cursor: pointer;
    padding: 0.8rem;
    border-radius: 0.8rem;
    transition: 0.5s all;
    color: white;
    z-index: 10;
    justify-content: center;
  }
`;

interface Props {
  show: boolean;
  onClose: () => any;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  hasExit?: boolean;
  styleBG?: React.CSSProperties;
}

function Modal(props: Props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [fadeOut, setfadeOut] = useState(false);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    setfadeOut(true);
    setTimeout(() => {
      setfadeOut(false);
      // enableScroll();
      props.onClose();
    }, 500);
  };

  const modalContent = props.show ? (
    <ModalWrapper className={`fade-in ${fadeOut && 'fade-out'}`}>
      <div style={props.styleBG} className="bg_dark" onClick={handleCloseClick}></div>
      <div className="content_wrapper">
        {props.hasExit && (
          <div className="exit_btn" onClick={handleCloseClick}>
            X
          </div>
        )}
        {props.children}
      </div>
    </ModalWrapper>
  ) : null;

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
  } else {
    return null;
  }
}

export default Modal;
