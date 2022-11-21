import React, { useEffect } from 'react';
import _p5 from 'p5';
import { useP5Context } from './P5Context';

interface Props {
  sketch: (p: _p5) => void;
}

export default function P5Canvas({ sketch }: Props): React.ReactElement {
  const { p5, setP5, setCanvasWidth, setCanvasHeight, ref } = useP5Context();

  useEffect(() => {
    if (ref?.current) {
      setP5(new _p5(sketch, ref.current));
    }

    return () => {
      if (p5) {
        p5.remove();
      }
    };
  }, [sketch]);

  useEffect(() => {
    function onResize() {
      if (ref?.current?.parentElement?.offsetWidth && ref.current?.parentElement?.offsetHeight) {
        setCanvasWidth(ref.current?.parentElement?.offsetWidth);
        setCanvasHeight(ref.current?.parentElement?.offsetHeight);
      }
    }
    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [p5, ref]);

  return <div ref={ref} />;
}
