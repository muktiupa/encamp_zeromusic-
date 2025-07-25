import{useState,useEffect,memo} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});
const BeautySection=(props)=>{
const {AOS,base_url,activitydata,setToggle,locations} = props;
const [sliderImages,setSliderImages] = useState([]);
const [states,setStates] = useState('');

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
var $ = require('jquery');
if (typeof window !== 'undefined') {
   window.$ = window.jQuery = require('jquery');
}
},[AOS,$])


useEffect(()=>{
const getActivity = async()=>{
if(activitydata.length > 0){
let data = activitydata;

let imgfilter = [];
let sdstate = data?.[1]?.state ?? "";
 data.map((obj)=>{
 
    sdstate = obj.state;
    
    if(obj.images[0] !==""){
       imgfilter = [...imgfilter,obj.images[0]] ;
    }
 })
 let cv = data && data[1] && data[1].state ? data[1].state : '';

 if(cv === ""){
    cv = locations?.[0]?.state ?? '';
 }

setStates(cv);

let fddata = imgfilter.filter(function( element ) {
   return element !== undefined;
});
setSliderImages(fddata);


}
}

if(activitydata.length > 0){
  getActivity();  
}

  }, [activitydata,locations]);

const responsive={
                0:{
                    items: 1
                },
                600:{
                    items: 1
                },
                1000:{
                    items: 3
                }
                }


return (<section className="beauty__area" id="beauty">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="beauty__wrap">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="beauty__topbar" data-aos="fade-right" data-aos-delay="50"
                                        data-aos-duration="1000">
                                        <h2>The mesmerising beauty of the {states}!</h2>
                            
                                    </div>
                                </div>
                            </div>
                            <div  id="customize" className="row">
                                <div className="col-lg-12">
                                {sliderImages && sliderImages.length > 0 &&
                                 <OwlCarousel   className="beauty__main__slider" responsive={responsive}  loop = {true} autoplay={true} autoplayTimeout={2000}  responsiveClass= {true} nav = {true} navText={ ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}  dots={false} margin={20} >
                                  
                                    {
                                    sliderImages.map((img,key)=>{
                                      return (
                                         <div key={key} className="beauty__single__slide">
                                            <Image src={img} alt="activity" layout="fill" objectFit="cover"/>
                                        </div>)

                                    })
                                    }
                              
                                    </OwlCarousel>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  className="col-lg-4">
                    </div>
                </div>
            </div>
        </section>)

}
export default memo(BeautySection);