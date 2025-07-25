import{useEffect,memo} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const SliderSection=(props)=>{
const {AOS,images,base_url,nameite,itenaryduration,totalcf} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
var $ = require('jquery');
if (typeof window !== 'undefined') {
   window.$ = window.jQuery = require('jquery');
}
  }, [AOS,$]);

const responsive={
                0:{
                    items: 1
                },
                600:{
                    items: 1
                },
                1000:{
                    items: 1
                }
                }

return (
	    <>
	    { images && images.length > 0 ?
	     <section className="trip__hero__area">
              <OwlCarousel className="trip__hero__slider" responsive={responsive}  loop = {true}  responsiveClass= {true} autoplay={true} autoplayTimeout={2000} nav = {true} navText={ ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}  dots={false} >
          { images.map((image,key)=>{

            return (
                   
                    <div key={key} className="trip__hero__slide" style={{backgroundImage: `url('${image}`}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="trip__hero__content" data-aos="fade-up" data-aos-delay="50"
                                    data-aos-duration="1000">
                                    <h2>{nameite}</h2>
                                    <div className="trip__hero__date">
                                        <div className = "diva"><Image src={`/assets/img/trip_date_icon.svg`} alt={`slider${key}`} object-fit='contain' layout='fill'/></div>
                                        <span>{itenaryduration || ''}</span>
                                        <div className="carbon__sp__wrap d-block d-lg-none">
                                           
                                            <Image src={`/assets/img/carbon-sp.png`} alt={`slider${key}`} object-fit='contain' layout='fill'/>
                            
                                            <div className="carbon__sp__content">
                                                <h4>{`${totalcf}KGS`}</h4>
                                                <p>Carbon FootPrint</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    
                   )


          })
                
            }
            </OwlCarousel>
            
	     </section>:""
	    }
	    </>
	    )
}
export default memo(SliderSection);