import React, { Suspense, useRef, useEffect } from "react";
import lottie from "lottie-web";
import Loading from "../../containers/loading/Loading";

// Display lottie props
export interface DisplayLottieProps {
  animationData: any;
  width?: string;
  height?: string;
  theme?: any;
  className?: string;
}

const DisplayLottie: React.FC<DisplayLottieProps> = ({ animationData }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      lottie.loadAnimation({
        animationData: animationData,
        container: ref.current,
        loop: true,
        autoplay: true,
      });
    }
  }, [animationData]);

  return (
    <Suspense fallback={<Loading />}>
      <div ref={ref} />
    </Suspense>
  );
};

export default DisplayLottie;
