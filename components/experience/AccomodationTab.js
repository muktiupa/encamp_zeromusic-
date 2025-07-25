import{useEffect} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from 'next/link';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});
import { useRouter } from 'next/router';

const AccomodationTab=(props)=>{

const {filter,base_url} = props;
const router = useRouter();

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
function getAccomodationPage(filter = {}) {
  const name = filter.name || '';
  const id = filter.id || '';
  const stateRaw = filter.state;

  if (!name || !id || !stateRaw) return '/';

  const slug = generateSlug(name);
  const state = generateSlug(stateRaw); 

  return `/destinations/${state}/accommodation/${slug}/${id}`;
}

const grandTotalcart=(noofpeople , noofdays)=>{
let total = filter.pricing[0].price;
let defaultno = filter.pricing[0].capacity || 0;
let roomtype = filter.pricing[0].roomtype;
let newnopeople = noofpeople ? noofpeople : defaultno;
let newdays = noofdays ? noofdays : 1;
let noofroomrequired = defaultno === 0 ? 0 : Math.ceil(+newnopeople/+defaultno);
let carbonval = Math.ceil(filter.carbonval * noofroomrequired * newdays);
let carboncess = Math.ceil((+total * 2.5)/100);
let subtotal = Math.ceil((+total + (+total * 30)/100) + (+total * 2.5)/100);
let taxat5percent = Math.ceil((subtotal * 5)/100);
let grand= subtotal + taxat5percent;

return {defaultno:defaultno,roomtype:roomtype,noofroomrequired:noofroomrequired,carbonval:carbonval,subtotal:subtotal,taxat5percent:taxat5percent,grand:grand,carboncess:carboncess,newdays:newdays,total:total}

}


  return (
            <div className="experience__tab__content__wrap">
             
               <div className="experience__top__wraps">
                    <div className="experience__tab__left__slider">
                        <OwlCarousel className="itinerary__content__right" responsive={responsive}  loop = {true}  responsiveClass= {true} nav = {true} navText={ ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}  dots={true} >
                         {
                            filter.images && filter.images.length > 0 && filter.images[0] !== "" ? filter.images.map((image,df)=>{
                                if(df < 3){
                              return (
                           <div key={df} className="itinerary__single__content experience__tab">
                                 <Image src={image} alt="slider" object-fit="contain" layout="fill"/>
                
                                <div className="experience__label">
                                    <span>Accommodation</span>
                                </div>
                            </div>
                                     )}}):<div className="itinerary__single__content experience__tab"><Image src='/assets/img/e2.jpg' alt="placeholder" object-fit="contain" layout="fill"/><div className="experience__label"><span>Accomodation</span></div></div>
                         }
                        </OwlCarousel>
                    </div>
                 
                        <div className="experience__tab__right">
                            <div className="experience__tab__right__title">
                                <h4>{filter.name || ""}</h4>
                            </div>
                            <div className="experience__tab__info" style={{width: '50%'}}>
                                <span><i className="fa fa-map-marker-alt"></i>{filter.district || ""}</span>
                                 <span><i className="fa fa-inr"></i>{filter.pricing && filter.pricing.length > 0 ? grandTotalcart().total : 0} onwards</span>
                            </div>
                              <div className="experience__tab__info2">
                                 <ul>
                                 {filter.thingstodo ? filter.thingstodo.map((thing,key)=>{
                                    if(thing.value !=="no-activity"){
                                     return ( <li key={key}><i className="fa fa-check"></i>{thing.label}</li>)
                                    }
                                    }):""}
                                  
                                 </ul>
                            </div>
                        </div>
                    
                     <div className="experience__list__info">
                         <ul>
                             
                         </ul>
                    
                        <div className="experience__review__blk">                                
                           <div className="experience__tab__review__btn">
                             {filter && 
                             <Link href={getAccomodationPage(filter)}>
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
export default AccomodationTab;