import { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useEventListener(eventName: string, handler: (arg0: any) => void, element: Window | Document | HTMLCanvasElement = window): void {
  useEffect(() => {
    element.addEventListener(eventName, handler);

    return (): void => {
      element.removeEventListener(eventName, handler);
    };
  }, [element, eventName, handler]);
}

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: window?.innerWidth, height: window?.innerHeight });

  function onWindowResize(): void {
    setWindowSize({ width: window?.innerWidth, height: window?.innerHeight });
  }

  useEventListener('resize', onWindowResize);

  return windowSize;
}

export function useMobile(): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}

export function useLarge(): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('lg'));
}

interface ParentSize {
  ref: (node: any) => void;
  width: number | undefined;
  height: number | undefined;
}

export function useParentSize(): ParentSize {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);

  const ref = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return {
    ref,
    width,
    height,
  };
}
