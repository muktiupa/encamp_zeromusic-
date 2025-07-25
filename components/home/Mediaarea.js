import{useEffect} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from "next/image";

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const Mediaarea=(props)=>{

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
                    items: 3
                },
                1000:{
                    items: 3
                }
                }

return (
	     <>
        <section className="media__area" style={{overflowX:'hidden'}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="about__title__blk media__title" data-aos="fade-left" data-aos-delay="50"
                            data-aos-duration="1000">
                            <span>Press</span>
                            <h2>Media mentions</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    <OwlCarousel nav={true} dots={true} className="media__main__slider destination__main__slider owl-carousel" responsive={responsive} loop = {true} margin={40} stagePadding={25}>
                       <div className="media__single__slide">
                                <div className="media__img__blk sus__blog__img">
                                    <Image src="/assets/img/yourstory.jpg" alt="story" object-fil='contain' layout='fill'/>
                                </div>
                                <div className="media__content">
                                    <h4 style={{fontSize:'1rem'}}>[Sustainability Agenda] This startup aims to make travel to Northeast India carbon neutral</h4>
                                    <Link href="https://yourstory.com/socialstory/2021/10/sustainability-agenda-encamp-adventures"  passHref><a target="_blank" rel="noopener noreferrer" className="common__btn">Read article</a></Link>
                                </div>
                            </div>
                      <div className="media__single__slide">
                                <div className="media__img__blk sus__blog__img">
                                    <Image src="/assets/img/evo.jpg" alt="story" object-fil='contain' layout='fill'/>
                                </div>
                                <div className="media__content">
                                    <h4 style={{fontSize:'0.9rem'}}>Exploring the Scotland of the East with a Tata Nexon</h4>
                                    <Link href="https://www.evoindia.com/features/tata-nexon-meghalaya" passHref><a target="_blank" rel="noopener noreferrer" className="common__btn">Read article</a></Link>
                                </div>
                            </div>
                    <div className="media__single__slide">
                                <div className="media__img__blk sus__blog__img">
                                    <Image src="/assets/img/media_img.jpg" alt="story" object-fil='contain' layout='fill'/>
                                </div>
                                <div className="media__content">
                                    <h4 style={{fontSize:'0.9rem'}}>AIC-SMUTBI plays catalyst to Encamp Adventures 1st big investment</h4>
                                    <Link href="https://aninews.in/news/business/business/aic-smutbi-plays-catalyst-to-encamp-adventures-1st-big-investment-launches-a-travel-carbon-footprint-calculator-and-expands-deeper-into-northeast-india20220830164852/" passHref><a target="_blank" rel="noopener noreferrer" className="common__btn">Read article</a></Link>
                                </div>
                            </div>
                

                    </OwlCarousel>

                    </div>
                 
                </div>

            </div>
            {/* <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="media__bottom__content" data-aos="zoom-in" data-aos-delay="50"
                            data-aos-duration="1000">
                            <p>Our valuable partners believe in our thoughtful approach and our untamed expertise in the
                                region. They foresee the future of sustainable travel, just like we do!</p>
                            <Link href="#"><a  className="common__btn">View All media mentions</a></Link>
                        </div>
                    </div>
                </div>

            </div> */}
        </section>
	        
	     </>
	    )

}
export default Mediaarea;