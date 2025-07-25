import{useState,memo} from "react";
import GetCalculationtable ,{getActivityroadmap} from "../components/itenary/itenaryViewfn";
import Link from "next/link";
import adminapi from "../api/adminapi";


const Ipdf=({data,other})=>{
const itenaryobj = [...data];
const acitvityrm = getActivityroadmap(itenaryobj);
const {order_id,payment_id,contact,email,checkindate,amount,nameofproduct,ordertotal,isadvance,name,nooftravellers} = other;


const getnoofperson=(itenaryobj)=>{
let noofperson = itenaryobj && itenaryobj.map((da)=>{
da.tempObj.map((rt)=>{
return rt.defaultnoofpeople;

});


});

}

return ( 
        <>
          <section className="itinerary__area" style={{marginTop:'3rem'}}>
          <div style={{width:'100%',margin:'0 auto'}}>
            <div className="information2__single__blk" style={{maxWidth:'1000px',margin: '0 auto'}}>
                <div className="information2__title">
                    <h2>Booking Information</h2>
                </div>
                <div className="information2__single__content">
                    <span className="flow">Booking ID : </span>
                    <span className="flow">{order_id ? order_id : ""}</span>
                </div>
                <div className="information2__single__content">
                    <span className="flow">Payment ID : </span>
                    <span className="flow">{order_id ? payment_id : ""}</span>
                </div>
              <div className="information2__single__content">
                  <span className="flow">Travellers : </span>
                  <span className="flow">{order_id ? `${name}, No.: ${nooftravellers || 1} px` : ""}</span>
                </div>
              <div className="information2__single__content">
                <span>Contact Details : </span>
                <span className="flow">{order_id ? ` Mobile number: - ${contact} , Email: - ${email} `: ""}</span>
            </div>
            <div className="information2__single__content">
                <span className="flow">Trip : </span>
                <span className="flow">{order_id ? nameofproduct : ""}</span>
            </div>
            <div className="information2__single__content">
              <span className="flow">Order Total : </span>
              <span className="flow">{order_id ? ordertotal : ""}</span>
              <span className="flow">(all inclusive)</span>

            </div>
          <div className="information2__single__content">
            <span className="flow">Trip Date : </span>
            <span className="flow">{order_id  ? checkindate : ""}</span>
        </div>
                            
          {isadvance === 'yes' ? 
          <div className="information2__single__content">
              <span className="flow">Advance Paid : </span>
              <span className="flow">{order_id ? Math.floor(amount/100): ""}</span>
          </div>:""}

  </div>
              </div>
            <div className="container" style={{marginTop: '5rem'}}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="itinerary__title__main">
                            <h2  id="itenaryas">Itinerary</h2>
                        <div className="itinerary__line__blk"></div>
                        </div>
                    {itenaryobj && itenaryobj[0].tempObj.map((data,k)=>{
                      return (
                        <div key={"sdsdxx" + k} className="itinerary__wrap">
                             <div className="itinerary__day">
                                <span id={"act" + k} style={{cursor:'pointer'}} onClick={(e)=>show(e,k)}>DAY {k + 1}</span>
                             </div>
                             {acitvityrm.length > 0 && acitvityrm[0][k].map((acs,kk)=>{
                               return (
                                       <div  key={"sss" + kk}>
                                       
                                        <div className="row">
                                          <div className="col-lg-2 col-md-2">
    

                                          </div>
                                         <div className="col-lg-8 col-md-9">
                                           <div className="itinerary__main__blk" data-aos="fade-up" data-aos-delay="50"
                                        data-aos-duration="1000">
                                              <div className="itinerary__title">
                                                      {acs.ischild ? <h4 style={{fontSize:'1.2rem'}}>{acs.activityname}</h4> : <h4>{acs.activityname}</h4>}
                                              </div>
                                              <div className="itinerary__location">
                                            {acs.activitytime && acs.activitytime !== "" ? <Link href="#"><a><i className="fa fa-clock"></i>Approximately {acs.activitytime}</a></Link>:""}
                                              </div>
                                           {/*   {acitvityrm[1][k][kk] ? <div className="titnerary__content__wrap">
                                                <div className="itinerary__content__left">
                                                  <ul>
                                                  <li><i className="fa fa-check"></i>{acitvityrm[1][k][kk] || ""}</li>
                                                  </ul>
                                                </div>
                                                </div>:""}*/}
                                          </div>
                                        </div>
                                       </div>
                                       </div>
                                    )

                             })}
                        
                  
                        </div>
                        
                        )})}
                    </div>
                </div>
            </div>
             
        </section>
        <section className="print__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="print__content" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <h4>Cancellation Policy</h4>
                            <p>While it would make us feel sad if you have to cancel your trip with us due to unforeseen.</p>
                            <p>We can understand that life can be unpredictable at times and we hope that you would give us
a chance to serve you at your convenience in the future. </p>
                            <p>In case of cancellations, please drop a mail at: support@encampadventures.com</p>
                                <div>16 - 20 days prior to arrival 75%</div>
                                <div>11 - 15 days prior to arrival 50%</div>
                                <div>6 - 10 days prior to arrival 10%</div>
                                <div>Less than 5 days prior to arrival 0%</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
        )

}
export default memo(Ipdf);

export async function getServerSideProps(context) {
const {iten,order_id,payment_id,contact,email,checkindate,amount,nameofproduct,ordertotal,isadvance,name,nooftravellers} = context.query;
const response = await adminapi.get(`/itinerary/${iten}`);

if(response.data){
	return { props: { data:response.data,other:{order_id,payment_id,contact,email,checkindate,amount,nameofproduct,ordertotal,isadvance,name,nooftravellers}} }
}

}