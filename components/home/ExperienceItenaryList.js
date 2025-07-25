import{useEffect,useCallback} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Image from "next/image";

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const ExperienceItenaryList=(props)=>{

const {AOS,itenary} = props;
const router = useRouter();

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
var $ = require('jquery');
if (typeof window !== 'undefined') {
   window.$ = window.jQuery = require('jquery');
}},[]);

const responsive={
                0:{
                    items: 1
                },
                600:{
                    items: 3
                },
                1000:{
                    items: 3
                }}

const getItenaryduration=useCallback((filter)=>{
let totaldays = 0;
let totalstay = 0;
totaldays = filter?.tempObj?.length ?? 0;  
filter.tempObj && filter.tempObj.map((stay)=>{
if(stay.accomodationdata.accomodation && stay.accomodationdata.accomodation.length > 0){
   totalstay = totalstay + 1; 
}
if(totalstay === totaldays && totalstay !== 0){
 totalstay = totalstay - 1;   
}

})

return `${totaldays} Days & ${totalstay} Nights`},[itenary]);

const getItenaryPage = (filter) => {
    if (!filter || !filter.itineraryindex || !filter.itineraryindex[0]) {
      return '/';
    }

    let name = filter?.itineraryindex?.[0]?.commondetails?.trip?.nameite ?? null;
    if(!name){
        name=filter?.itineraryindex?.[0]?.nameite ?? "";
    }

    let id = filter._id || "";

    if (name !== "") {
      let nameurl = name.trim().replace(/\s+/g, '-').toLowerCase();
      return `/itinerary/${nameurl}/${id}`;
    }
    return '/';};
    
const getPriceString=(filter)=>{
let total = filter?.itineraryindex?.[0]?.commondetails?.cost?.allinclusive ?? null;
let typeoftt = filter?.itineraryindex?.[0]?.commondetails?.typeoftrip ?? '';
if(typeoftt && typeoftt === 'group'){
  total = filter?.itineraryindex?.[0]?.commondetails?.grouptrip?.[0]?.groupprice ?? 0;
}
if(total){
return total;
}}
const shuffleArray=(array)=>{
    const shuffledArray = [...array]; 
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;}

return (<section className="destinations__area" id="destinations" style={{overflowX:'hidden'}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-md-10">
                        <div className="destinations__topbar" data-aos="fade-up" data-aos-delay="50"
                            data-aos-duration="1000">
                            <span>Destinations</span>
                            <h2>Our loyalists remember us by our destinations.</h2>
                            <p style={{maxWidth:"100%"}}>Witness the best of culture, cuisine, people and places with a booking to remember, just
                                like our loyalists do. </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-gl-12">
                        <OwlCarousel nav={false}  className="destination__main__slider" responsive={responsive}  loop = {true} margin={10} stagePadding={20}  responsiveClass= {true}>
                          {
                            (itenary && itenary.length > 0 ) ? shuffleArray(itenary).map((single,key)=>{
                       return (
                                <div key={key} className="destination__single__slide">
                                   {single.isfeatured ? <span className="des_slide_target">Featured</span>:""}
                                   {single?.itineraryindex?.[0]?.commondetails?.typeoftrip ? <span className="des_slide_target_group">{single?.itineraryindex?.[0]?.commondetails?.typeoftrip}</span>:""}
                                    <div className="destinations__img_slider">
                                      <div className="destination__img__slide">
                                        {single?.itineraryindex?.[0]?.commondetails?.images?.length > 0 ? (
                                            <Image
                                              src={single?.itineraryindex?.[0]?.commondetails?.images?.[0]}
                                              layout="fill"
                                              objectFit="contain"
                                              alt="slider"
                                            />
                                            ): 
                                            <img src="assets/img/d1.jpg" alt="slider" />
                                        }
                                        <div className="des_date">
                                            <Image src="/assets/img/trip_date_icon.svg" alt="icon" height='30' width='30'/>
                                            <span>{getItenaryduration(single)}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <Link href={getItenaryPage(single)}>
                                    <div className="destination__slider__content">
                                      <div className="destination__slider__content__topbar">
                                         <h4 style={{maxWidth: '280px',fontSize: '0.9rem'}}>{single?.itineraryindex?.[0]?.commondetails?.trip?.nameite ?? ""}</h4>
                                      </div>
                                      <div className="destination__slider__content__topbar">
                                        <h6 style={{maxWidth: '280px',fontSize: '0.8rem',fontWeight:'500',}}>{single?.itineraryindex?.[0]?.commondetails?.trip?.tripdetails ?? ""}</h6>
                                      </div>
                                      <div className="destination__price">
                                        <h5><span>₹ {getPriceString(single)}</span>
                                        {single?.itineraryindex?.[0]?.commondetails?.typeoftrip === 'group' ? 1 : single?.itineraryindex?.[0]?.commondetails?.noofperson} Pax</h5>
                                      </div>
                                      <div className="destination__btn__blk">
                                         {single && <Link href={getItenaryPage(single)}>
                                           <a className="common__btn">View Itinerary</a>
                                         </Link>}
                                      </div>
                                    </div>
                                    </Link>
                                </div>
                              )}): ""}
                        </OwlCarousel>
                    </div>
                </div>
            </div>
            <div className="hero__btn__blk">
                <Link href="/experience"><a className="common__btn">View All</a></Link>
            </div>
        </section>
        )
}
export default ExperienceItenaryList;