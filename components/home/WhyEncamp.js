import{useEffect} from "react";
import Link from 'next/link';
import Image from 'next/image';

const WhyEncamp=(props)=>{

const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, [AOS]);

return (
	     <>
         <div style={{marginTop: '0.5rem'}}></div>
         <section className="about__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="about__title__blk" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <span>Encamp</span>
                            <h2>Why Encamp?</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 ">
                        <div className="about__single__blk" data-aos="fade-up" data-aos-delay="20" data-aos-duration="1000">
                            <p>We are a purpose driven travel enterprise offering hassle free, end-to-end experiences. A
                                signatory to the Tourism Declares a Climate Emergency, our itineraries help you discover
                                a lot more than the offbeat locations and their hidden gems. Thanks to our expertise in
                                the Northeast, you get to experience the best of the land with the locals,</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="about__single__blk" data-aos="fade-up" data-aos-delay="30" data-aos-duration="1100">
                            <p>at accommodations closest to nature, getting you up close with the culture, cuisines and
                                people. With optimum route planning, every day is a new discovery and a deep dive into
                                the place that’s backed by our fair-trade practices to empower and upgrade the
                                livelihoods of the local communities and minimise climate impact.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="about__single__blk" data-aos="fade-up" data-aos-delay="40" data-aos-duration="1300">
                            <div><Image src="/assets/img/ab1.svg" alt="a1" layout='fill' object-fit='contain'/></div>
                            <h4 className="mt-3">Conscious Customization</h4>
                               <p style={{marginTop: '-15px',fontSize:'0.9rem'}}>Tailored To Your Ethical Choices</p>
                              <ul>
                              <li>Hassle-free, end-to-end travel itinerary planning</li>
                              <li>Unique Itineraries & Immersive Experiences.</li>
                              <li>Climate Action with every trip you plan.</li>
                              </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="about__single__blk" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <div><Image src="/assets/img/ab2.svg" alt="a1" layout='fill' object-fit='contain'/></div>
                            <h4 className="mt-3">Nature-Based Experiences</h4>
                               <p style={{marginTop: '-15px',fontSize:'0.9rem'}}>Properties with a view and a local touch.</p>
                               <ul>
                               <li>Nature-Centric stays that have a view & vibe.</li>
                               <li>Cultural Insights from the local host.</li>
                               <li>Local Cuisine & Beverages as per choice.</li>
                             </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="about__single__blk" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <div><Image src="/assets/img/ab3.svg" alt="a1" layout='fill' object-fit='contain'/></div>
                            <h4 className="mt-3">Encamp Travel Experience</h4>
                            <p style={{marginTop: '-15px',fontSize:'0.9rem'}}>Trust our Guest-Centric Approach</p>
                             <ul>
                             <li>600+ Positive Google Reviews from satisfied travelers.</li>
                             <li>Guest-Centric Focus in crafting experiences tailored to your desires.</li>
                             <li>Services Team of experienced local experts focused on your experience.</li>
                             </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="about__single__blk" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <div><Image src="/assets/img/ab4.svg" alt="a1" layout='fill' object-fit='contain'/></div>
                            <h4 className="mt-3">Value for Money</h4>
                            <p style={{marginTop: '-15px',fontSize:'0.9rem'}}>Good Value For The Price You Pay</p>
                               <ul>
                               <li>High-Quality accommodation.</li>
                               <li>Convenient transportation with a polite driver.</li>
                               <li>Exciting activities Included in the package.</li>
                               </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="sus__img__blk" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
                            <Image src="/assets/img/sus_img.jpg" alt="sus_img.jpg" layout='fill' object-fit='contain' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
	        
	     </>
	    )

}
export default WhyEncamp;