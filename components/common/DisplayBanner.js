import {getRandomNumber} from "../../function/generateNumber";
import { useRouter } from 'next/router';

const DisplayBanner=()=>{

const router = useRouter();
return (
	    <section id="addc" className="mb-5 md:px-5 px-2">
        <div id="banner" onClick={()=>router.push('/ziro_camping')} 
        style={{backgroundImage: `url(/assets/ziro/zfm_banner/${getRandomNumber(2,7)}.png)`}}>
        <div id="sleft">
        <img src="/assets/ziro/zfm_banner/banner_left.png" alt="banner"/>
        </div>
         <div id="sright">
        <img src="/assets/ziro/zfm_banner/banner_right.png" alt="banner"/>
        </div>
        </div>

        </section>
	   )

}
export default DisplayBanner;