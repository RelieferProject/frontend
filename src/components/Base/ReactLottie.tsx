import React from 'react';
import Lottie from 'react-lottie';

interface Props extends SimpleComponent {
  json: any;
  height?: number;
  width?: number;
}

function ReactLottie(props: Props) {
  // console.log(props.json);
  const defaultOptions: any = {
    loop: true,
    autoplay: true,
    animationData: props.json,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={props.width || 400} width={props.height || 400} />
    </div>
  );
}

export default ReactLottie;
