import{useState,useEffect} from "react";
import Image from 'next/image';


const One=(props)=>{
const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, [AOS]);



return (
	      <section className="hero__index__two">
	              <div className="hero__s1 hero__s0">
                  <Image
                        src="/assets/img/hero_s1.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__s2 hero__s0">
                <Image
                        src="/assets/img/hero_s2.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__s3 hero__s0">
                <Image
                        src="/assets/img/hero_s3.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__s4 hero__s0">
                  <Image
                        src="/assets/img/hero_s4.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />          
             </div>
            <div className="hero__s5 hero__s0">
                <Image
                        src="/assets/img/hero_s5.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__s6 hero__s0">
                <Image
                        src="/assets/img/hero_s6.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__s7 hero__s0">
                <Image
                        src="/assets/img/hero_s7.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__s8 hero__s0">
                <Image
                        src="/assets/img/hero_s8.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__s9 hero__s0">
                <Image
                        src="/assets/img/hero_s9.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__s10 hero__s0">
                <Image
                        src="/assets/img/hero_s10.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
            <div className="hero__s11 hero__s0">
                <Image
                        src="/assets/img/hero_s11.svg"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        width={100}
                        height={100} 
                 />
            </div>
	     </section>
	   )

}
export default One