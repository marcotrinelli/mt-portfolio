import React, { Suspense, useRef } from "react";
import lottie from "lottie-web";
import Loading from "../../containers/loading/Loading";

export default function DisplayLottie({animationData}) {

    const ref = useRef();
    React.useEffect(() => {
        lottie.loadAnimation({
            animationData: animationData,
            container: ref.current,
            loop: true,
            autoplay: true,
        });
    },[animationData])

    return (
        <Suspense fallback={<Loading />}>
            <div ref={r => ref.current = r} />
        </Suspense>
    )

}