import{useState,useEffect} from "react";
import Image from 'next/image';


const Four=(props)=>{
const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, [AOS]);



return (
         <section className="hero__index__four">
            <div className="hero__index3__sp6_cv">
                  <Image
                        src="/assets/img/hero/sp8.png"
                        alt="logo"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        objectFit='cover'
                        layout="fill"
                 />
            </div> 
             <div className="hero__index4__sp7">
                  <Image
                        src="/assets/img/hero/sp7.svg"
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
export default Four;