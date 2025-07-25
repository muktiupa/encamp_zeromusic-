import {useEffect} from "react";
import Link from "next/link";
import Image from "next/image";


const ServiceArea=(props)=>{
const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);
return (
	     <>
	      <section className="service__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="service__main__blk" data-aos="fade-right" data-aos-delay="80"
                            data-aos-duration="1000">
                            <div className="service__topbar">
                                <h2>Building the next big revolution <br/>in sustainable travel</h2>
                                <p>As responsible travellers, we focus on offering opportunities to immerse yourself in regions of great natural beauty and diversity without the damage brought in by commercial tourism. </p>
                            </div>
                            <div className="service__content__wrap">
                                <div className="service__single__content">
                                    <h4>Carbon Offsettings</h4>
                                    <p>Tourism accounts for around 8% of the worlds carbon emissions, making it a significant contributor to climate change. While there are many ways that you can minimise your carbon footprint while travelling, certain carbon emissions are unavoidable. Thats where our carbon offsetting options come in.</p>
                                </div>
                                <div className="service__single__content">
                                    <h4>Friendly Team</h4>
                                    <p>You travel with Encamp, you join a community thats proud to help you. Striving towards helping you make the most of your adventure, they also help in protecting our most vulnerable and treasured destinations.</p>
                                </div>
                                <div className="service__single__content">
                                    <h4>Exotic, Exclusive locations and properties</h4>
                                    <p>We take the guesswork out of your travel planning and discover inspiring travel options that you won’t find on any Google search. Our personalised services & locations will make your travel experience seamless and worry-free from start to finish.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 order-first order-lg-last">
                        <div className="service__img__blk" data-aos="zoom-in" data-aos-delay="80" data-aos-duration="1300">
                            <Image src="/assets/img/service__img.jpg" object-fit='contain' layout='fill' alt='service__img'/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	     </>
	     )

}
export default ServiceArea;