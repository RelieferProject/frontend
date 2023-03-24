import { ConfirmContext, stateContext, initial } from '@providers/Confirm';
import { useContext } from 'react';

interface IPromiseReturn {
  confirm: boolean;
  value?: string;
}

const useConfirm = () => {
  const { confirm, setConfirm, state, setState } = useContext(ConfirmContext);

  const isConfirmed = (arg: stateContext): Promise<IPromiseReturn> => {
    console.log(arg);
    let val = { ...initial, ...arg };
    setState({ ...state, ...val });
    const promise = new Promise<IPromiseReturn>((resolve, reject) => {
      setConfirm({
        isOpen: true,
        proceed: resolve,
        cancel: reject,
      });
    });
    return promise;
  };
  return {
    confirm,
    isConfirmed,
    state,
    setState,
    setConfirm,
  };
};

export default useConfirm;
