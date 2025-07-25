import{useEffect} from "react";
import Link from 'next/link';
import Image from 'next/image';
const Packagearea=(props)=>{

const {AOS,setToggle} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, [AOS]);

return (
	     <>
         <section id="ASx" className="package__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-7">
                        <div className="package__left__blk" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <h2>Not a fan of readymade itineraries?</h2>
                            <p>Add a touch of personalisation to your plan. Co-plan your itinerary with Encamp experts.
                                Get in touch!</p>
                            <div className="package__btn__blk">
                                <Link href="#ASx"><a onClick={()=>setToggle(true)} className="common__btn">Talk to us</a></Link>
                                {/* <Link href="#"><a className="package__btn">View Packages<i className="fa fa-arrow-right"></i></a></Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-5 order-first order-md-last order-lg-last">
                        <div className="package__img__blk" data-aos="fade-down" data-aos-delay="50"
                            data-aos-duration="1000" style={{position:'relative'}}>
                            <Image src="/assets/img/package.svg" alt="package" object-fit='contain' layout='fill'/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	        
	     </>
	    )

}
export default Packagearea;