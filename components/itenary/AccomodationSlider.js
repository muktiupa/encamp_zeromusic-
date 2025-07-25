import{useEffect,memo} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});


const AccomodationSlider=(props)=>{
const {AOS,base_url,accomodation,checkinouttime,isfoodincluded} = props;

const accomdata = accomodation?.accomodation?.length > 0 ? accomodation.accomodation[0] : '';

const {defaultacapacity,selectedroom} = accomodation; 
const placeholderimage= `/assets/img/iti_slide2.jpg`;

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
                }}

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }}

const formatTo12Hour = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) return '';
  const [hour, minute] = timeStr.split(':').map(Number);
  if (isNaN(hour) || isNaN(minute)) return '';
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hr = hour % 12 || 12;
  return `${hr.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
};



  return (
          <>
          {
            (accomdata !== "") ? 
           <div style={{maxWidth: '450px'}} className="px-5 py-4 bvxc">
                    <OwlCarousel
                                responsive={responsive}
                                loop={true}
                                responsiveClass={true}
                                nav={true}
                                navText={['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}
                                dots={true}
                              >
                              {accomdata && accomdata.images
                                ? accomdata.images.map((image, key) =>
                                    isValidURL(image) ? (
                                      <div className="itinerary__single__contentxx" key={key}>
                                        <Image src={image} alt={`acco-${key}`} layout="fill" objectFit="cover" />
                                        <div className="common__btnx" style={{position: 'absolute',bottom: '10px',left: '10px',height:'37px',width:'auto',padding:'0 10px',background:'yellow',color: 'black'}}>{accomdata?.district ?? ''}</div>
                                      </div>
                                    ) : null
                                  )
                                : (
                                  <div className="itinerary__single__contentxx">
                                    <Image src={placeholderimage} alt="acco" layout="fill" objectFit="cover" />
                                  </div>
                                )
                              }
                   </OwlCarousel>

            <div className="d-flex justify-content-between align-items-center mt-2 mb-4 text-sm font-medium text-muted">
              <div>Check-In {formatTo12Hour(checkinouttime?.[0])}</div>
              <div>Check-Out {formatTo12Hour(checkinouttime?.[1])}</div>
            </div>
             <h3 style={{fontSize: '1.3rem'}} className="text-uppercase font-weight-bold text-lg text-success">Encamp {accomdata?.locationtype ?? ''}</h3>
             <ul style={{paddingLeft:'0px'}} className="my-2">
               <li className="d-flex align-items-center text-sm">
                 <span className="h-2 w-2 bg-success rounded-full cvvvx"></span>
                 Property type {accomdata?.locationtype ?? ''}.
               </li>
               <li className="d-flex align-items-center text-sm">
                 <span className="h-2 w-2 bg-success rounded-full cvvvx"></span>
                 Sharing with {defaultacapacity} Person.
               </li>
               <li className="d-flex align-items-center text-sm">
                 <span className="h-2 w-2 bg-success rounded-full cvvvx"></span>
                {isfoodincluded ? 'Breakfast included in the trip cost.' : 'Breakfast included in the trip cost.'}
               </li>
                <li className="d-flex align-items-center text-sm">
                 <span className="h-2 w-2 bg-success rounded-full cvvvx"></span>
                Carbon Emission Score: {accomdata?.carbonval ?? 0} KG/ perday.
               </li>
             </ul>
           </div>
             :""
             }

            </>
          )

}
export default memo(AccomodationSlider);