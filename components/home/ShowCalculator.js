import{useEffect} from "react";
import Link from 'next/link';
import Image from 'next/image';

const ShowCalculator=(props)=>{

const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, [AOS]);

return (
	     <>
	        <section className="package__area map">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-7">
                        <div className="package__left__blk map" data-aos="fade-up" data-aos-delay="50"
                            data-aos-duration="1000">
                            <h2>We’ve made it easy for you to take climate action.</h2>
                            <p>Your one small step can go a long way in climate action. Be a green warrior with your
                                individual contribution that becomes a force with millions of others. Become a conscious
                                climate hero by knowing your carbon footprint with our Carbon Footprint Calculator!
                            </p>
                            <div className="package__btn__blk map">
                                <Link href="https://carbontrace.in/travelcalculator/" passHref><a target="_blank" rel="noopener noreferrer" className="common__btn">Show me the calculator</a></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-5 order-first order-md-last order-lg-last">
                        <div className="package__img__blk" data-aos="fade-down" data-aos-delay="50"
                            data-aos-duration="1000">
                            <Image src="/assets/img/map_marker.svg" alt='marker' layout='fill' object-fit='contain'/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	     </>
	    )

}
export default ShowCalculator;