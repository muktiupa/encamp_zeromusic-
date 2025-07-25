import{useState,useEffect,useCallback} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import dynamic from 'next/dynamic';
import adminapi from "../../api/adminapi";
import Link from 'next/link';
import Moment from 'moment';
import {filterAndSortTrips} from "../../function/componentFunction";

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});
import { useRouter } from 'next/router';
import Image from "next/image";

const ItenaryTab=(props)=>{

const {filter,getCalculates,base_url} = props;
const router = useRouter();
const [activitycv,setActivitycv] = useState([]);
const ascvimages = filter?.itineraryindex?.[0]?.images ?? filter?.itineraryindex?.[0]?.commondetails?.images ?? []

useEffect(() => {

var $ = require('jquery');
if (typeof window !== 'undefined') {
   window.$ = window.jQuery = require('jquery');
}}, []);
const placeholderimage= `${base_url}/assets/img/iti_slide2.jpg`;

const responsive={
    0:{
        items: 1
    },
    600:{
        items: 1
    },
    1000:{
        items: 1
    }}

const getItenaryduration=(filter)=>{
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

return `${totaldays} Days & ${totalstay} Nights`}

const getPriceString=(filter)=>{
let  noofperson = filter?.itineraryindex?.[0]?.commondetails?.noofperson ?? null; 
if(!noofperson){
 noofperson = filter?.grandtotal?.[0]?.noofperson ?? 2;
}

let agc = filter?.itineraryindex?.[0]?.commondetails?.cost?.margin ?? null;
if(!agc){
  agc = filter?.itineraryindex?.[0]?.agencycomission ?? 30;
}
let customprice = filter?.grandtotal?.[0]?.customprice ?? null;
if(!customprice){
  customprice = filter?.itineraryindex?.[0]?.commondetails?.cost?.allinclusive ?? ''; 
}
let typeoftrip = filter?.itineraryindex?.[0]?.typeoftrip ?? null;
if(!typeoftrip){
  typeoftrip = filter?.itineraryindex?.[0]?.commondetails?.typeoftrip ?? 'private';
}
if(typeoftrip === 'group'){
   noofperson = 1; 
   customprice = grouptriparr?.[0]?.groupprice ?? 0 ; 
  
}

let total = 0;
if(customprice && customprice !==""){
 total = Number(customprice).toFixed(0);   
}else{
let totalx = getCalculates(filter.tempObj,noofperson,agc,typeoftrip,customprice);
total = Number(totalx[8].subtotal).toFixed(0);  
}



return ` ${total}/ ${noofperson} pax`
}

const getlocationdetails=(filter)=>{
let districts = [];
filter.tempObj && filter.tempObj.map((stay)=>{
if(stay.accomodationdata.accomodation && stay.accomodationdata.accomodation.length > 0){
   districts = [...districts,stay?.accomodationdata?.accomodation?.[0]?.district ?? ''];
}

})

return `${districts[0]} + ${districts.length -1 } More locations`}

/**
 * Generate a clean URL slug from text
 */
function generateSlug(text = '') {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')   // Remove non-word characters except space and hyphen
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/-+/g, '-')        // Collapse multiple hyphens
    .trim();
}

/**
 * Safely extract state from tempObj array
 */
function extractStateFromTempObj(tempObj = []) {

  return (
    tempObj?.[0]?.location?.[0]?.state ||
    tempObj?.[1]?.location?.[0]?.state ||
    ''
  );
}

/**
 * Generate full itinerary page URL
 */
function getItenaryPage(filter) {
  if (!filter || !filter.itineraryindex || !filter.itineraryindex[0]) {
    return '/';
  }

  const index = filter.itineraryindex[0];
  const tempObj = filter?.tempObj || [];

  const stateRaw = extractStateFromTempObj(tempObj);
  const state = generateSlug(stateRaw);
  const nameRaw = index?.commondetails?.trip?.nameite || index?.commondetails?.trip?.name || '';
  const slug = generateSlug(nameRaw);

  const id = filter._id || '';

  if (!state || !slug || !id) {
    return '/';
  }

  return `/destinations/${state}/itinerary/${slug}/${id}`;
}


const getListofRandomActivityofItenary=()=>{
let activities = [...activitycv];
if(activities.length > 0){    
 let random = Math.floor((Math.random() * activities.length));
 return activities[random];
}}
const randomActivity1 = useCallback(getListofRandomActivityofItenary(),[activitycv]);
const randomActivity2 = useCallback(getListofRandomActivityofItenary(),[activitycv]);
const randomActivity3 = useCallback(getListofRandomActivityofItenary(),[activitycv]);
const randomActivity4 = useCallback(getListofRandomActivityofItenary(),[activitycv]);

const getGrouptripSchedule=()=>{
 let sch = filter?.itineraryindex?.[0]?.commondetails?.grouptrip ?? null;
if(sch){
 let filteredsch = filterAndSortTrips(sch);
  if(filteredsch){
       return filteredsch;
  }
 
}}
const grouptriparr = useCallback(getGrouptripSchedule(),[filter]);


useEffect(()=>{
if(filter.tempObj && filter.tempObj.length > 0){
let actdas = filter.tempObj.map((da)=>{
    let dsd =  da.activitydata;
if(dsd){
  return dsd.toString();
}
});
let uniqueIdArray = [...new Set(actdas)].filter(id => id !== 'no-activity');
let masteractstring = uniqueIdArray.join(",");

const getActivitynames=async()=>{
let dataxc = await adminapi.get(`/getactivities?id=${masteractstring}`);

let dataactivity = dataxc.data;

if(dataactivity){
let coractnames = dataactivity.map(as=>as.name);
setActivitycv(coractnames);

}

}
getActivitynames();
}},[filter]);


    return (
        <div>
           {filter.itineraryindex ?
            <div className="experience__tab__content__wrap">
                <div className="experience__tab__left__slider">
                        <OwlCarousel className="itinerary__content__right" responsive={responsive}  loop = {true} autoplay={true} autoplayTimeout={2000}  responsiveClass= {true} nav = {true} navText={ ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}  dots={true} >
                         {
                            ascvimages && ascvimages.length > 0 && ascvimages.map((image,ik)=>{
                              return (
                           <div key={ik} className="itinerary__single__content experience__tab">
                            {filter?.itineraryindex?.[0]?.commondetails?.typeoftrip === 'group' ? <span id="des_slide_target_group">Group</span>:<span id="des_slide_target_group">Private</span>}
                                <Image src={image} alt="slider" object-fit="contain" layout="fill"/>
                                <div className="experience__label">
                                    <span>Itinerary</span>
                                </div>
                            </div>
                                     )})
                         }
                        </OwlCarousel>
                    </div>

                            <div className="experience__tab__right">
                                <div className="experience__tab__right__title">
                                   <h4>{filter.itineraryindex[0]?.nameite || filter.itineraryindex[0]?.commondetails?.trip?.nameite || ''}</h4>
                            </div>

                <div className="experience__tab__info">
                    <span><i className="fa fa-map-marker-alt"></i>{getlocationdetails(filter)}</span>
                    <span><i className="fa fa-clock"></i>{getItenaryduration(filter)}</span>
                    <span><i className="fa fa-inr"></i>{getPriceString(filter)}</span>
                </div>
                <Link style={{cursor:'pointer',zIndex:'999'}} href={getItenaryPage(filter)}>
                <div className="experience__tab__info__wrap">
                    <div className="experience__tab__info2">
                        {
                            filter?.itineraryindex?.[0]?.commondetails?.typeoftrip === 'group' ?
                          <ul>
                           {grouptriparr && grouptriparr.map((schs,ss)=>{
                             return (
                                     <li key={ss}><i className="fa fa-check"></i>{`${Moment(schs.startdate).format('D MMM YY')} to ${Moment(schs.enddate).format('D MMM YY')}`}</li>
                                    )
                           })}
                         </ul>
                        :<ul>
                            <li><i className="fa fa-check"></i>{randomActivity1}</li>
                            <li><i className="fa fa-check"></i>{randomActivity2}</li>
                            <li><i className="fa fa-check"></i>{randomActivity3}</li>
                            <li><i className="fa fa-check"></i>{randomActivity4} and more....</li>
                        </ul>
                       }
                    </div>
                   <div className="experience__review__blk">                                
                       <div className="experience__tab__review__btn">
                         {filter && 
                         <Link href={getItenaryPage(filter)}>
                            <a className="common__btn">View Itinerary</a>
                         </Link>
                         }
                       </div>                         
                    </div>
                </div>
                </Link>
             </div>
            </div>
                      
                    :""}               
        </div>
            )
}
export default ItenaryTab;