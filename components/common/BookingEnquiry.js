import {useEffect} from "react";
import { useRouter } from 'next/router';

const BookingEnquiry = (props)=>{

const {AOS,base_url,successpage} = props;
const router = useRouter();

const handleClick = (event) => {
    event.preventDefault();
    router.push("/");
  };

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);


return (
	  <main className="main overflow-hidden">                          
        <section className="booking__hero__area faq__hero__area" style={{backgroundImage:`url('assets/img/booking__bg.jpg')`}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="booking__hero__content" data-aos="fade-up" data-aos-delay="50"
                            data-aos-duration="1000">
                            <h1>Thank you for Contacting Us !</h1>
                            <p>We have recieved your enquiry.Someone from Team Encamp will get in touch with you shortly.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="information__area2">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="information2__single__blk" data-aos="fade-right" data-aos-delay="50"
                            data-aos-duration="1000">
                            <div className="information2__title">
                                <h2>{ successpage?.info?.nameite ? 'Custom Itinerary Request' : 'General Enquiry'}</h2>
                            </div>
                            <div className="information2__single__content">
                                <span>Reference id</span>
                                <h4>{successpage?.phone || ""}</h4>
                            </div>
                          
                            { successpage?.info?.traveller ?
                              <div className="information2__single__content">
                                <span>Travellers</span>
                                <h4>{successpage?.info?.traveller || ""}</h4>
                            </div>:""}
                              <div className="information2__single__content">
                                <span>Contact Details</span>
                                <h4>{successpage?.name}</h4>
                                <h4>{` Mobile number: ${successpage?.phone || ""} `}</h4>
                                <h4>{`Email: ${successpage?.email || ""} `}</h4>
                            </div>
                           { successpage?.info?.nameite ?
                            <div className="information2__single__content">
                                <span>Trip</span>
                                <h4>{successpage?.info?.nameite || ""}</h4>
                            </div> : ''}
                         
                              { successpage?.info?.travelSdate ?<div className="information2__single__content">
                                <span>Trip Date</span>
                                <h4>{`From: ${successpage?.info?.travelSdate || ""} to ${successpage?.info?.travelEdate || ""}`}</h4>
                            </div> :""}
                             { successpage?.info?.message ?<div className="information2__single__content">
                                <span>Your Message</span>
                                <h4>{successpage?.info?.message}</h4>
                            </div> :""}
                          
                            <div className="information2__btn__blk">
                                 <a onClick={handleClick} className="common__btn">Go to Home page</a>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </section>
        </main>
	   )

}
export default BookingEnquiry;