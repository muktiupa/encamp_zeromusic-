import{useState,useEffect} from "react";
import Link from "next/link";
import { useRouter } from 'next/router';



const TripDetails=(props)=>{
const router = useRouter()
const {AOS,images,base_url ,toggle,setToggle,setToggles,toggles,description,summery,totalcf,nameite,totalpricetag,locationdetails,sociallinking} = props;
const [isLess,setIsLess] = useState(true);

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, []);

const getShortdescription=(desc)=>{
let shortdes = desc.indexOf('</p>');
if(shortdes !== -1 && shortdes <= 500){
  return desc.substr(0,shortdes); 

}else{
    return desc.substr(0,500);
}


}
return (
	     <section  id="tripdetails" className="details__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="details__tab__blk" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button onClick={()=>router.push('#tripdetails')} className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                        data-bs-target="#tripdetails" type="button" role="tab" aria-controls="home"
                                        aria-selected="true">Event details</button>

                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={()=>router.push('#beauty')} className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                        data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                        aria-selected="false">Photos</button>
                                </li>
                       
                            
                            </ul>

                            <div  className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                    aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="trip__tab__title">
                                                <h2 style={{fontSize:'2rem'}}>About {nameite}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12" dangerouslySetInnerHTML={{ __html: isLess ? getShortdescription(description): description}}>
                                            
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {description.indexOf('</p>') >= 500 ? <div className="trip_tab_btn">
                                                <div onClick={()=>setIsLess(!isLess)} style={{cursor:'pointer',color:'#34CC9C'}}><a>{isLess ? 'Read More' : 'Read Less'}<i className="fa fa-chevron-right"></i></a></div>
                                            </div> : ''}
                                        </div>
                                        {sociallinking && sociallinking.youtube ?
                                        <div className="col-lg-12 mt-5">
                                          <iframe
                                            width="100%"
                                            height="400"
                                            src={sociallinking.youtube}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                          ></iframe>
                                        </div> : ''
                                         }
                                    </div>
                                </div>

                    

                            </div>

                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="details__sitebar__main" data-aos="fade-left" data-aos-delay="50"
                            data-aos-duration="1000">
                          
                            <div className="trip__sitebar__title">
                                <h4 style={{fontSize:'1.2rem'}}>Event summary</h4>
                                <p>{summery ? summery : ''}</p>
                            </div>
        
                        <div className="bg-lightGreen-300 rounded-lg p-20">
                           <hr></hr>
                          
                           <h6 className="text-xs">Looking for a Shorter Stay? </h6>
                           <p
                             style={{ fontSize: "0.8rem", color: "var(--bs-body-color)" }}
                           >
                             Reach out to us for details on our shorter duration custom
                             packages. Enquire Now!
                           </p>
                           <div
                             id="enquiry_zfm"
                             className="common__btn sidebar-open"
                             style={{
                               width: "100%",
                               cursor: "pointer",
                               backgroundColor: "rgb(251, 204, 4)",
                             }}
                             onClick={() => setToggles(!toggles)}
                           >
                             Enquire Now
                           </div>
                         </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	    )

}
export default TripDetails;