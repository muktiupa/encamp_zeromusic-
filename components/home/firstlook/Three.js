import{useState,useEffect} from "react";
import Image from 'next/image';


const Three=(props)=>{
const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, [AOS]);



return (
         <section className="hero__index__three">
                  <div className="hero__index3__sp6">
                  <Image
                        src="/assets/img/hero/sp6.svg"
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
export default Three;