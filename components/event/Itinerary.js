import{useState,useEffect,useCallback} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Image from "next/image";
import {getCalculates} from "../itenary/calculateitenary";
import adminapi from "../../api/adminapi";

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});


const Itinerary=(props)=>{

const {AOS,itenary} = props;
const [iten,setIten] = useState([]);

const router = useRouter();

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

const getListofRandomActivityofItenary=(filter)=>{
let activities = [];
filter.tempObj.map((activity)=>{
    let ate = activity.activitynames;
activities = [...activities,...ate]

})
 let random = Math.floor((Math.random() * activities.length))

return activities[random];
}

const getItenaryduration=useCallback((filter)=>{
let totaldays = 0;
if(filter.grandtotal){
totaldays = filter.grandtotal[0].gdays;
}
let totalstay = 0;
filter.tempObj && filter.tempObj.map((stay)=>{
if(stay.accomodationdata.accomodation && stay.accomodationdata.accomodation.length > 0){
   totalstay = totalstay + 1; 
}

})

return `${totaldays} Days & ${totalstay} Nights`

},[iten]);



const getItenaryPage=(filter)=>{

let name = filter.itineraryindex[0].nameite || "";
let id = filter._id || "";
if(name !== ""){
let nameurl = name.trim().replace(/\s+/g, '-').toLowerCase(); 
router.push(`/itinerary/${nameurl}/${id}`);   
}


}
const getPriceString=(filter)=>{
let noofperson = filter.grandtotal[0].noofperson;

let agc = filter.itineraryindex[0].hasOwnProperty('agencycomission') ? filter.itineraryindex[0].agencycomission : 30;
let customprice = filter.grandtotal[0].hasOwnProperty('customprice') ? filter.grandtotal[0].customprice : "";
let typeoftrip = filter.itineraryindex[0].hasOwnProperty('typeoftrip') ? filter.itineraryindex[0].typeoftrip : "";
if(typeoftrip === 'group'){
   noofperson = 1; 
}
let totalx = getCalculates(filter.tempObj,noofperson,agc,typeoftrip,customprice);
let total = totalx[8].subtotal.toFixed(0);


return total;
}

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

useEffect(()=>{
let sdf = [];
const getsomeiten = async()=>{
try{
if(itenary && itenary.length > 0){
let ffv = itenary.map(ff=>ff.value);


let res  = await adminapi.get(`/getsomeitinerary?id=${ffv.toString()}`);
if(res.data){
sdf	= res.data;
}	
}
}catch(e){
console.log(e);
}
setIten(sdf);
}

getsomeiten();

},[itenary]);

return (
	    <>
	    {iten && iten.length > 0 ? 
	     <section className="destinations__area" id="destinations" style={{overflowX:'hidden',zIndex:0}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-md-10">
                        <div className="itinerary__title__main" data-aos="fade-up" data-aos-delay="50"
                            data-aos-duration="1000">
                            <h2 style={{fontSize:'2rem'}}>Related Itinerary</h2>
                            <div className="itinerary__line__blk"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-gl-12">
                        
                        <OwlCarousel nav={false}  className="destination__main__slider" responsive={responsive}  loop = {true} margin={10} stagePadding={20}  responsiveClass= {true}>
                         {
                            (iten && iten.length > 0 ) ? shuffleArray(iten).map((single,key)=>{
                       return (
                            <div key={key} className="destination__single__slide">
                                {single.itineraryindex[0].isfeatured ? <span className="des_slide_target">Most popular</span>:""}
                                {single.itineraryindex[0].hasOwnProperty('typeoftrip') && single.itineraryindex[0].typeoftrip === 'group' ? <span className="des_slide_target_group">Group</span>:""}
                                <div className="destinations__img_slider">
                                    <div className="destination__img__slide">
                                        {single?.itineraryindex?.[0]?.images?.length ? (
                                          <Image
                                            src={single.itineraryindex[0].images[0]}
                                            layout="fill"
                                            objectFit="contain"
                                            alt="slider"
                                          />
                                        ) : (
                                          <img src="assets/img/d1.jpg" alt="slider" />
                                        )}
                                        <div className="des_date">
                                            <Image src="/assets/img/trip_date_icon.svg" alt="icon" height='30' width='30'/>
                                            <span>{getItenaryduration(single)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="destination__slider__content">
                                  <div className="destination__slider__content__topbar">
                                        <h4 style={{maxWidth: '280px',fontSize: '0.9rem'}}>{single.itineraryindex[0].nameite || ""}</h4>
                                  </div>
                                   <div className="destination__list">
                                        <ul>
                                            <li><span><i className="fa fa-check"></i></span>{getListofRandomActivityofItenary(single) || ""}</li>
                                            <li><span><i className="fa fa-check"></i></span>{getListofRandomActivityofItenary(single) || ""}</li>
                                            <li><span><i className="fa fa-check"></i></span>{getListofRandomActivityofItenary(single) || ""}</li>
                                        </ul>
                                    </div>
                                    <div className="destination__price">
                                        <h5><span>₹ {getPriceString(single)}</span>{single.itineraryindex[0].hasOwnProperty('typeoftrip') && single.itineraryindex[0].typeoftrip === 'group' ? 1 : single.grandtotal[0].noofperson} Pax</h5>
                                    </div>
                                    <div className="destination__btn__blk">
                                        <div className="common__btn" style={{cursor:'pointer'}} onClick={()=>getItenaryPage(single)}>Book Now</div>
                                    </div>
                                </div>                              
                            </div>
                             )})
                            :""}
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
         : ''}
        </>
        )
}
export default Itinerary;
