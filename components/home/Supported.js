import{useEffect} from "react";
import Image from "next/image";

const Supported=(props)=>{

const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, [AOS]);

return (
	     <>
         <section className="support__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="support__title" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <h2>Supported by</h2>
                        </div>
                    </div>
                </div>
                <div className="row" style={{justifyContent:'space-between',alignItems:'center',width: '100%'}}>
                    <div className="col-lg-2 col-md-2 col-5">
                        <div className="support__single__blk" data-aos="zoom-in" data-aos-delay="50"
                            data-aos-duration="1000">
                           <Image src="/assets/img/supported_by/assam_startup.png" alt="Ariba" object-fit='contain' layout='fill'/>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-5">
                        <div className="support__single__blk" data-aos="zoom-in" data-aos-delay="50"
                            data-aos-duration="1000">
                           <Image src="/assets/img/supported_by/aic-smutbi.png" alt="aic" object-fit='contain' layout='fill'/>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-5">
                        <div className="support__single__blk" data-aos="zoom-in" data-aos-delay="50"
                            data-aos-duration="1000">
                           <Image src="/assets/img/supported_by/cisco.png" alt="cisco" object-fit='contain' layout='fill'/>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-5">
                        <div className="support__single__blk" data-aos="zoom-in" data-aos-delay="50"
                            data-aos-duration="1000">
                            <Image src="/assets/img/supported_by/hdfc.png" alt="hdfc" object-fit='contain' layout='fill'/>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-5">
                        <div className="support__single__blk" data-aos="zoom-in" data-aos-delay="50"
                            data-aos-duration="1000">
                           <Image src="/assets/img/supported_by/sap-ariba.png" alt="Ariba" object-fit='contain' layout='fill'/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	        
	     </>
	    )

}
export default Supported;