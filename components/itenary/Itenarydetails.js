import{useState,useEffect,memo,useRef } from "react";
import Link from "next/link";
import AccomodationSlider from "./AccomodationSlider";
import Image from 'next/image';
import adminapi from "../../api/adminapi";


const Itenarydetails=(props)=>{
const {AOS,base_url,itenaryobj , setAddonData , addonData , setShowModal , isenquried , setIsenquried , isonceOpen,setIsonceOpen} = props;
const [accoms , setAccoms] = useState([]);
const [acitvityrm,setActivityrm] = useState([]);
const [daywiseopenclose,setDaywiseopenclose] = useState({act0:0});
const dayRefs = useRef([]);
const modalTriggered = useRef(false); // Track if modal has been triggered

const checkItineraryInStorage = () => {
  const storedIds = JSON.parse(localStorage.getItem("itenaryIds")) || [];
  const currentId = itenaryobj?.[0]?._id ?? null;
  
  if (currentId && storedIds.includes(currentId)) {
    setIsenquried(true);
  }
};

useEffect(() => {
    checkItineraryInStorage();
  }, [itenaryobj]);

const getactivityroadmapapi = async(id)=>{
    let res = await adminapi.get(`/getactivityroadmap/${id}`);
    if(res.data){
        return res.data; 
    }}

const getAccomodationData = async()=>{

let accoarr = itenaryobj?.[0]?.tempObj?.map(dd=>dd.accomodationdata) ?? [] ;
setAccoms(accoarr);
}

useEffect(()=>{
const asasdd=async()=>{
   let idfx = itenaryobj?.[0]?._id ?? null;
 if(acitvityrm.length === 0){
   if(idfx){
let dataxc = await getactivityroadmapapi(idfx);
 setActivityrm(dataxc);
} 
 }

}
asasdd();
getAccomodationData();
},[itenaryobj]);

const show = (e, id) => {
  if (!isenquried && id > 1) {
    setShowModal(true);
    alert("Open Enquiry Form");
    return;
  }

  if (daywiseopenclose.hasOwnProperty(e.target.id)) {
    let data = { ...daywiseopenclose };
    delete data[e.target.id];
    setDaywiseopenclose(data);
  } else {
    setDaywiseopenclose({ ...daywiseopenclose, [e.target.id]: id });
  }
};

const addActivitytoItineary = async(day , indexofactivity)=>{
let sdsd = [...acitvityrm];
let ddd = sdsd?.[0]?.[day]?.[indexofactivity]?.activityid ?? null;
if(ddd){
  sdsd[0][day][indexofactivity].activityoptions = false;
  setActivityrm(sdsd);
  setAddonData([...addonData,ddd]);
}

}

const removeActivitytoItineary = async(day , indexofactivity)=>{
let sdsd = [...acitvityrm];
let ddd = sdsd?.[0]?.[day]?.[indexofactivity]?.activityid ?? null;
if(ddd){
  sdsd[0][day][indexofactivity].activityoptions = true;
  setActivityrm(sdsd);
 let dssd = [...addonData];
 dssd = dssd.filter((dds=> dds !== ddd));
 setAddonData(dssd);
}

}

const handleIntersection = (entries) => {
  if(isonceOpen === 1){
    console.log('once open');
    return;
  }

  entries.forEach((entry) => {
      if (entry.isIntersecting) {
      const dayNumber = parseInt(entry.target.id.replace("day", ""), 10);
     const currentUrl = window.location.href;

      if (currentUrl.includes('adminview')) {
        setDaywiseopenclose((prevState) => ({ ...prevState, [`act${dayNumber}`]: dayNumber }));
        return;
      }
      
      if (!modalTriggered.current && !isenquried && dayNumber > 1){
        setShowModal(true);
        modalTriggered.current = true;
        return;
      }else{

      setDaywiseopenclose((prevState) => ({ ...prevState, [`act${dayNumber}`]: dayNumber }));
      }
      }
  });
};
useEffect(() => {
  
  // Initialize Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust as needed
  });

  // Observe each day element
  dayRefs.current.forEach((ref) => observer.observe(ref));

  // Cleanup observer
  return () => observer.disconnect();
}, ["",isenquried]);




return ( 
      <>
       <section className="itinerary__area mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="itinerary__title__main">
                            <h2  id="itenaryas">Itinerary</h2>
                        <div className="itinerary__line__blk"></div>
                        </div>
                    {itenaryobj && itenaryobj.length > 0 && itenaryobj[0].tempObj && itenaryobj[0].tempObj.length > 0 ? itenaryobj[0].tempObj.map((data,k)=>{
                      return (
                        <div key={"sdsdxx" + k} className="itinerary__wrap">

                             <div className="itinerary__day" ref={(ref) => (dayRefs.current[k] = ref)} id={`day${k}`}>
                                <span id={"act" + k} style={{cursor:'pointer'}} onClick={(e)=>show(e,k)}>DAY {k + 1}</span>
                                    
                             </div>
                             {
                              acitvityrm && acitvityrm.length > 0 && acitvityrm[0] && acitvityrm[0][k] && acitvityrm[0][k].map((acs,kk)=>{

                               return (
                                    <div  key={"sss" + kk}>
                                        {(daywiseopenclose. hasOwnProperty("act" + k)) ? 
                                        <div className="row">
                                            <div className="col-lg-2 col-md-2">
                                              {(k && kk && k === 0  && kk === 0) ? <div className="itinerary__icon__blk">
                                                <Image src={`/assets/img/iti_1.svg`} alt="iti_1.svg" object-fit='contain' layout='fill'/>
                                              </div> :""}
                                               {(k && kk && k === (itenaryobj[0].tempObj.length -1) && kk === (acitvityrm[0][k].length -1)) ? <div className="itinerary__icon__blk">
                                                 <Image src={`/assets/img/iti_1.svg`} alt="iti_1.svg" object-fit='contain' layout='fill'/>
                                              </div> :""}
                                              {(k && kk && k !== (itenaryobj[0].tempObj.length -1) && kk === (acitvityrm[0][k].length -1)) ? <div className="itinerary__icon__blk">
                                                 <Image src={`/assets/img/iti_3.svg`} alt="iti_3.svg" object-fit='contain' layout='fill'/>
                                              </div> :""}
                                              {(acs.activitystart && acs.activitystart === 'yes') ? <div className="itinerary__icon__blk">
                                                
                                                 <Image src={`/assets/img/iti_2.svg`} alt="iti_2.svg" object-fit='contain' layout='fill'/>
                                              </div> :""}
                                            </div>
                                            <div className="col-lg-8 col-md-9">
                                                 <div className="itinerary__main__blk">
                                                  
                                                  {acs?.activityimage && !acs.activityoptions
                                                     ? <div style={{maxWidth: '400px',height: '200px',position:'relative',borderRadius: '15px',marginBottom: '1.2rem',overflow: 'hidden' }}>
                                                         <Image                                                        
                                                         src={acs?.activityimage}
                                                         alt="activityimage"
                                                         layout='fill'
                                                         objectFit="cover"
                                                       />
                                                        </div>
                                                     : null
                                                   }             
                                                  <div className="itinerary__title">
                                                     <h4 style={acs.activityoptions ? {fontSize:'1rem'} : {fontSize:'1.2rem'}}>{acs.activityname}</h4>
                                                       {acs.activityoptions ? <button  className="common__btnx"  style={{border:'none',outline:'none',paddingTop:'5px'}} onClick={()=>addActivitytoItineary(k , kk)}>Add Activity</button> : ''}

                                                  </div>                                                                  
                                                   <div className="itinerary__location">
                                                      {acs.activitytime && acs.activitytime !== "" ? <Link href="#"><a><i className="fa fa-clock"></i>Approximately {acs.activitytime}</a></Link>:""}

                                                   </div>
                                                   {
                                                    acitvityrm[1][k][kk] && !acs.activityoptions ? 
                                                     <div className="titnerary__content__wrap">
                                                        <div className="itinerary__content__left">
                                                          <ul>
                                                            <li><i className="fa fa-check"></i>{acitvityrm[1][k][kk] || ""}</li>
                                                         </ul>
                                                        
                                                        </div>
                                                     </div>
                                                     :""
                                                   }
                                                   {!acs.activityoptions && addonData.includes(acs.activityid) ? <button style={{backgroundColor:'black',border:'none',outline:'none',marginTop:'1rem'}} className="common__btnx"  onClick={() => removeActivitytoItineary(k, kk)}>Remove Activity</button> : ''}
                                            </div>
                                        </div>
                                    </div>
                                    : ""}
                                    </div>
                                    )})
                             }
                        
                             {(accoms && accoms.length > 0 && accoms[k] && accoms[k].hasOwnProperty('aid') && accoms[k].aid !== "" && accoms[k].aid !== "ACC-GMKLL6" && daywiseopenclose. hasOwnProperty("act" + k)) ? <AccomodationSlider AOS={AOS} base_url={base_url}  accomodation = {accoms[k]} checkinouttime={[data.checkintime,data.checkouttime]} isfoodincluded={data.isfoodincluded}/>:""}
                        </div>
                        
                        )}):""}
                    </div>
                </div>
            </div>
        </section>
        </>
        )
}
export default memo(Itenarydetails);