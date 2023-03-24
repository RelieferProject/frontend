import PopupContext from '@providers/Popup';
import { useContext } from 'react';

const usePopup = () => {
  return useContext(PopupContext);
};

export default usePopup;
