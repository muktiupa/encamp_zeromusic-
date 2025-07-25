import{useState,useEffect} from "react";
import Image from 'next/image';


const Two=(props)=>{
const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, [AOS]);



return (
	     <section className="hero__index__two">
	              <div className="hero__index2__sp1">
                  <Image
                        src="/assets/img/hero/sp1.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__index2__sp2">
                <Image
                        src="/assets/img/hero/sp2.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__index2__sp3">
                <Image
                        src="/assets/img/hero/sp3.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__index2__sp4">
                  <Image
                        src="/assets/img/hero/sp4.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        objectFit='cover'
                        layout="fill"
                 />          
             </div>
            <div className="hero__index2__sp5">
                <Image
                        src="/assets/img/hero/sp5.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        objectFit='cover'
                        layout="fill"
                 />
            </div>
   
	     </section>
	   )

}
export default Two