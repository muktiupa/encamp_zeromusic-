import{useEffect} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const SliderSection=(props)=>{
const {AOS,images,base_url,name,totalcf,totalprice} = props;


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
              <OwlCarousel   className="trip__hero__slider" responsive={responsive}  loop = {true}  responsiveClass= {true} nav = {true} navText={ ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}  dots={false} >
          { images.map((image,key)=>{
             if(key < 3){
            return (
                   
                    <div key={key} className="trip__hero__slide" style={{backgroundImage: `url('${image}`}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="trip__hero__content" data-aos="fade-up" data-aos-delay="50"
                                    data-aos-duration="1000">
                                    <h2>{name}</h2>
                                    <div className="trip__hero__date" style={{color:'white',fontSize: '1.5rem',fontWeight: '600'}}>
                                        ₹ {totalprice}/- onwards..
                                        
                                        <div className="carbon__sp__wrap d-block d-lg-none">
                                            <img src={`${base_url}/assets/img/carbon-sp.png`} alt=""/>
                                            <div className="carbon__sp__content">
                                                <h4>{`${totalcf}KGS`}</h4>
                                                <p>Carbon Saved</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    
                   )
             }

          })
                
            }
            </OwlCarousel>
            
	     </section>:""
	    }
	    </>
	    )
}
export default SliderSection;