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
    AOS.init();
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
              <OwlCarousel   className="trip__hero__slider" responsive={responsive}  loop = {true}  responsiveClass= {true} autoplay={true} autoplayTimeout={4000} nav = {true} navText={ ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}  dots={false} >
          { images.map((image,key)=>{

            return (
                   
                    <div key={key} className="trip__hero__slide" style={{backgroundImage: `url('${image}`}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="trip__hero__content">
                                    <h1>{nameite}</h1>
                                    <div className="trip__hero__date">
                                        <div className = "diva"><Image src={`/assets/img/trip_date_icon.svg`} alt={`slider${key}`} object-fit='contain' layout='fill'/></div>
                                        <span>{itenaryduration || ''}</span>
                                      
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