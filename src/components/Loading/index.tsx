import React from 'react';
import Lottie from 'lottie-react';
import LoadingJson from '@assets/lottie/loading.json';

function Loading({ absolute }: { absolute?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center mx-auto ${
        absolute ? 'absolute left-1/2 -translate-x-1/2' : 'relative'
      }`}
    >
      <Lottie
        className="w-[15rem]"
        loop={true}
        autoplay={true}
        animationData={LoadingJson}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
      ></Lottie>
    </div>
  );
}

export default Loading;
