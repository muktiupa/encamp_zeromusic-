import{useEffect} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import dynamic from 'next/dynamic';
import Image from "next/image";

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const ActivityTab=(props)=>{

const {key,filter,base_url} = props;
useEffect(() => {

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

const getShortdescription=(desc)=>{
let shortdes = desc.indexOf('</p>');
if(shortdes !== -1 && shortdes <= 300){
  return desc.substr(0,shortdes) + " ...... "; 

}else{
    return desc.substr(0,300) + " ...... ";
}


}

	return (
            <div className="experience__tab__wraps">
                <div className="experience__label__wrap">
                    <div className="sitebar__price__main">
                        <h4>₹ {filter.price || 0}</h4>
                        <p>For 1 People</p>
                    </div>
                </div>
               <div className="experience__top__wraps">
                    <div className="experience__tab__left__slider">
                        <OwlCarousel className="itinerary__content__right" responsive={responsive}  loop = {true}  responsiveClass= {true} nav = {true} navText={ ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}  dots={true} >
                         {
                            filter.images && filter.images.length > 0 ? filter.images.map((image,pk)=>{
                              return (
                           <div key={pk} className="itinerary__single__content experience__tab">
                                 <Image src={image} alt="slider" object-fit="contain" layout="fill"/>
                
                                <div className="experience__label">
                                    <span>Activity</span>
                                </div>
                            </div>
                                     )}):<div className="itinerary__single__content experience__tab"><Image src='/assets/img/e2.jpg' alt="placeholder"/><div className="experience__label"><span>Activity</span></div></div>
                         }
                        </OwlCarousel>
                    </div>
                    <div className="experience__tab__rights">
                        <div className="experience__tab__right">
                            <div className="experience__tab__right__title">
                                <h4>{filter.name || ""}</h4>
                            </div>
                            <div className="experience__tab__info">
                                <span><i className="fa fa-map-marker-alt"></i>{filter.state || ""}</span>
                                <span><i className="fa fa-clock"></i>Duration: {filter.duration / 60} Hours</span>
                            </div>
                            <div className="experience__tab__info__wrap">
                                <p>{getShortdescription(filter.description) || ""}</p>
                            </div>
                        </div>
                    </div>
                     <div className="experience__list__info">
                         <ul>
                             
                         </ul>
                         <a href="#" className="common__btn">Show Locations</a>
                     </div>
                </div>

            </div>
		    )
}
export default ActivityTab;