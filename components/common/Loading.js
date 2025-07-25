import React,{useState,useEffect} from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';

const  Loading=({forceloading})=> {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

useEffect(()=>{
setLoading(forceloading);
},[forceloading]);

    useEffect(() => {
        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => (url === router.asPath) && setLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })
    return loading && (
                    
                       <div className="loader">
                        <Player autoplay loop
                           src="/assets/lottie/animation_lm6cykqw.json"
                           style={{ height: '300px', width: '300px' }}
                         >
                           <Controls visible={false}/>
                         </Player>
                       </div>
                       );
}
export default Loading;