import{useState,useEffect} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from 'next/link';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});
import { useRouter } from 'next/router';

const EventTab=(props)=>{

const {filter,base_url} = props;
const router = useRouter();
const [addonlist,setAddonlist] = useState(null);

useEffect(() => {

var $ = require('jquery');
if (typeof window !== 'undefined') {
   window.$ = window.jQuery = require('jquery');
}
  }, []);

useEffect(()=>{
 if(filter && filter.addons && filter.addons.length > 0){
  let addonlistraw = filter.addons.filter((filt)=>filt.id !== '');
if(addonlistraw && addonlistraw.length > 0){
    setAddonlist(addonlistraw);
 }else{
    setAddonlist(null);
 }
}

},[filter]);


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
// Utility to create a clean slug
function generateSlug(text = '') {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove non-alphanumeric characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Collapse multiple hyphens
    .trim();
}

// Main URL generator
function getEventPage(filter = {}) {
  const name = filter.name || '';
  const id = filter.id || '';
  const stateRaw = filter.state;

  if (!name || !id || !stateRaw) return '/';

  const slug = generateSlug(name);
  const state = generateSlug(stateRaw); 

  return `/destinations/${state}/event/${slug}/${id}`;
}

const grandTotalcart=(noofpeople , noofdays)=>{
let basetotal = filter.pricing[0].price;
let defaultno = filter.pricing[0].capacity || filter.pricing[0].capacity !== 0 ? filter.pricing[0].capacity : 0;
let accommodationtype = filter.pricing[0].accommodationtype;
let newnopeople = noofpeople ? noofpeople : defaultno;
let newdays = noofdays ? noofdays : 1;
let noofroomrequired = defaultno === 0 ? 0 : Math.ceil(+newnopeople/+defaultno);
let carbonval = Math.ceil(filter.carbonval * noofroomrequired * newdays);
let total = +basetotal * +newdays * +noofroomrequired;
let carboncess = Math.ceil((+total * 2.5)/100);
let subtotal = Math.ceil((+total + (+total * 2.5)/100));
let taxat5percent = Math.ceil((subtotal * 5)/100);
let grand= subtotal + taxat5percent;

return {defaultno:defaultno,accommodationtype:accommodationtype,noofroomrequired:noofroomrequired,carbonval:carbonval,subtotal:subtotal,taxat5percent:taxat5percent,grand:grand,carboncess:carboncess,newdays:newdays,total:total}
}

const getShortdescription=(desc)=>{
let shortdes = desc?.indexOf('</p>') ?? -1;
if(shortdes !== -1 && shortdes <= 150){
  return desc.substr(0,shortdes) + ' ......'; 

}else{
    return desc.substr(0,150)  + ' ......';
}

}


  return (
            <div className="experience__tab__content__wrap">
             
               <div className="experience__top__wraps">
                    <div className="experience__tab__left__slider">
                        <OwlCarousel className="itinerary__content__right" responsive={responsive}  loop = {true}  responsiveClass= {true} nav = {true} navText={ ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}  dots={true} >
                         {
                            filter.images && filter.images.length > 0 && filter.images[0] !== "" && filter.images.map((image,df)=>{
                                if(df < 3){
                              return (
                           <div key={df} className="itinerary__single__content experience__tab">
                                 <Image src={image} alt="slider" object-fit="contain" layout="fill"/>
                
                                <div className="experience__label">
                                    <span>Event</span>
                                </div>
                            </div>
                                     )}})
                         }
                        </OwlCarousel>
                    </div>
                 
                        <div className="experience__tab__right">
                            <div className="experience__tab__right__title">
                                <h4>{filter.name || ""}</h4>
                            </div>
                            <div className="experience__tab__info">
                                <span><i className="fa fa-map-marker-alt"></i>{filter.district || ""}</span>
                                 <span><i className="fa fa-inr"></i>{filter.pricing && filter.pricing.length > 0 ? grandTotalcart().total : 0} onwards</span>
                                 <span><i className="fa fa-calendar"></i>{filter.eventdate ? `From: ${filter.eventdate.startDate} To ${filter.eventdate.endDate}` : ''}</span>
                            </div>
                              <div className="experience__tab__info2">
                                 {addonlist ? 
                                  <ul>
                                  {addonlist.map((thing,key)=>{
                                        return ( <li key={key}><i className="fa fa-check"></i>{thing.name}</li>) 
    
                                    })
                                  }
                                  
                                 </ul> :
                                 <div dangerouslySetInnerHTML={{ __html: getShortdescription(filter.description)}}></div> 
                                 }
                            </div>
                        </div>
                    
                     <div className="experience__list__info">
                         <ul>
                             
                         </ul>
                       
                        <div className="experience__review__blk">                                
                           <div className="experience__tab__review__btn">
                             {filter && 
                             <Link href={getEventPage(filter)}>
                                <a className="common__btn">View Details</a>
                             </Link>
                             }
                           </div>                         
                        </div>
                               
                     </div>
                </div>

            </div>
        )
}
export default EventTab;