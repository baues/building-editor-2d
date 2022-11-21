import React, { useContext, useMemo, useState, useRef, RefObject } from 'react';
import _p5 from 'p5';

interface P5State {
  p5: _p5 | null;
  setP5: (p5: _p5) => void;
  canvasWidth: number;
  setCanvasWidth: (canvasWidth: number) => void;
  canvasHeight: number;
  setCanvasHeight: (canvasHeight: number) => void;
  ref: RefObject<HTMLDivElement> | null;
}

const initialState = {
  p5: null,
  setP5: () => { },
  canvasWidth: 0,
  setCanvasWidth: () => { },
  canvasHeight: 0,
  setCanvasHeight: () => { },
  ref: null,
};

const P5Context = React.createContext<P5State>(initialState);

interface P5ProviderProps {
  children: React.ReactNode;
}

export function P5Provider({ children }: P5ProviderProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const [p5, setP5] = useState<_p5 | null>(initialState.p5);
  const [canvasWidth, setCanvasWidth] = useState(initialState.canvasWidth);
  const [canvasHeight, setCanvasHeight] = useState(initialState.canvasHeight);

  const state: P5State = useMemo(() => {
    return {
      p5,
      setP5,
      canvasWidth,
      setCanvasWidth,
      canvasHeight,
      setCanvasHeight,
      ref,
    };
  }, [canvasHeight, canvasWidth, p5]);

  return <P5Context.Provider value={state}>{children}</P5Context.Provider>;
}

export function useP5Context(): P5State {
  return useContext(P5Context);
}
