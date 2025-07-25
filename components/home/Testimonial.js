import{useEffect} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from "next/image";

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});


const Testimonial=(props)=>{

const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
var $ = require('jquery');
if (typeof window !== 'undefined') {
   window.$ = window.jQuery = require('jquery');
}
  }, []);

const responsive={
                0:{
                    items: 1
                },
                600:{
                    items: 2
                },
                1000:{
                    items: 2
                }
                }

return (
	     <>
         <section className="testimonial__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-md-10">
                        <div className="testimonial__title about__title__blk" data-aos="fade-left" data-aos-delay="50"
                            data-aos-duration="1000">
                            <span>Testimonial</span>
                            <h2>Once an Encamper, always an Encamper!</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                      <OwlCarousel nav={false}  className="testimonial__main__slider" responsive={responsive}  loop = {true} margin={40} stagePadding={25}  responsiveClass= {true}>
  
                        
                           <div className="testimonial__single__slide">
                                <div className="testimonial__quote">
                                    <span><i className="fas fa-quote-left"></i></span>
                                </div>
                                <div className="testimonial__content">
                                    <p>Absolutely blown away by the quality of service. Starting from fitting in
                                        seasons best locations in the itinerary & arranging wonderful properties to
                                        effortlessly accommodating last minute requests - everything was top notch. Five
                                        stars all the way!</p>
                                </div>
                                <div className="testimonial__user__blk">
                                    <div className="testimonial__user__img">
                                        <Image src="/assets/img/rajiv_mehta.png" layout='fill' object-fit='contain' alt="rajiv_mehta.png"/>
                                    </div>
                                    <div className="testimonial__user__info">
                                        <h4>Rajiv Mehta</h4>
                                        <p>Fashion Designer, Mumbai</p>
                                    </div>
                                </div>
                            </div>

                            <div className="testimonial__single__slide">
                                <div className="testimonial__quote">
                                    <span><i className="fas fa-quote-left"></i></span>
                                </div>
                                <div className="testimonial__content">
                                    <p>Just a wonderful set of people. If you feel you need a fresh breath of air, you
                                        need to be with Encamp. Arranging camps at some of these locations is one heck
                                        of a task in itself. But these guys blend it with Good food and service. They
                                        have literally leap-bounded my expectations.</p>
                                </div>
                                <div className="testimonial__user__blk">
                                    <div className="testimonial__user__img">
                                        <Image src="/assets/img/testimonial_2.jpg"  layout='fill' object-fit='contain' alt="testimonial_2.png"/>
                                    </div>
                                    <div className="testimonial__user__info">
                                        <h4>Mompia Gogoi</h4>
                                        <p>Tech Lead, Bangalore</p>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial__single__slide">
                                <div className="testimonial__quote">
                                    <span><i className="fas fa-quote-left"></i></span>
                                </div>
                                <div className="testimonial__content">
                                    <p>Just a wonderful set of people. If you feel you need a fresh breath of air, you
                                        need to be with Encamp. Arranging camps at some of these locations is one heck
                                        of a task in itself. But these guys blend it with Good food and service. They
                                        have literally leap-bounded my expectations.</p>
                                </div>
                                <div className="testimonial__user__blk">
                                    <div className="testimonial__user__img">
                                        <Image src="/assets/img/mompia_gogoi.png" alt="mompia_gogoi" layout='fill' object-fit='contain'/>
                                    </div>
                                    <div className="testimonial__user__info">
                                        <h4>Nabasindu Paul</h4>
                                        <p>UI/UX Designer</p>
                                    </div>
                                </div>
                            </div>

                       </OwlCarousel>    
                    </div>
                </div>
            </div>
        </section>
	        
	     </>
	    )

}
export default Testimonial;