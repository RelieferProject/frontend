import { useEffect, useRef, useState } from 'react';

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback?.current();
      }
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return savedCallback;
};

export const useIntervalTick = (delay = 1000) => {
  const [state, setState] = useState(0);
  const interval = useInterval(() => setState(state + 1), delay);

  return state;
};
