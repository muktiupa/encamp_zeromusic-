import{useEffect} from "react";
import Link from 'next/link';
import Image from 'next/image';

const Sustainability=(props)=>{

const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, [AOS]);

return (
	     <>
        <section className="sustainability__area" style={{backgroundImage: "url('assets/img/sus_bg.jpg')"}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="sus__content__blk" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <span>Sustainability</span>
                            <h2>Our environment is as dear to us as the place itself.</h2>
                            <p>Support community-led climate action to minimise impact on climate change in India and
                                the rest of the planet.</p>
                            {/*<Link href="#"><a className="common__btn">Learn More</a></Link>*/}
                        </div>
                    </div>
                </div>
                <div className="sus__single__wrap" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="sustainability__single__blk">
                                <h4>What do we envision?</h4>
                                <p><span></span> To enable individuals and organizations to catalyse community-led
                                    positive
                                    climate action
                                    with zero efforts.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="sustainability__single__blk" data-aos="fade-up" data-aos-delay="50"
                                data-aos-duration="1000">
                                <h4>What’s our mission?</h4>
                                <p><span></span> We built the carbon footprint calculator to make anybody a climate
                                    champion. Besides working out climate impact in no time, one joins the growing
                                    community
                                    of gamechangers who are taking climate action on-the-ground to save our planet.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="sus__blog__title" data-aos="fade-down" data-aos-delay="50" data-aos-duration="1000">
                            <h2>Projects we’re currently supporting in Northeast:</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="sus__blog__single" data-aos="fade-right" data-aos-delay="50"
                            data-aos-duration="1000">
                            <div className="sus__blog__img">
                                <Image src="/assets/img/waste_management.jpg" alt="waste_management" layout='fill' object-fit='contain'/>
                            </div>
                            <div className="sus__blog__info">
                                <h4>Waste Management</h4>
                                <p>We take efforts to promote and help channelize better waste management, food securing
                                    methods, water preservation plans and secure livelihoods.</p>
                                {/* <Link href="#"><a>Learn More <i className="fa fa-arrow-right"></i></a></Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="sus__blog__single" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <div className="sus__blog__img">
                                <Image src="/assets/img/tree_plantation.jpg" alt="plant" layout='fill' object-fit='contain'/>
                            </div>
                            <div className="sus__blog__info">
                                <h4>Tree Plantation</h4>
                                <p>We work closely with the local communities to preserve, conserve and save the native
                                    flora and fauna coupled with restoration and forestation.</p>
                                {/* <Link href="#"><a>Learn More <i className="fa fa-arrow-right"></i></a></Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="sus__blog__single" data-aos="fade-left" data-aos-delay="50"
                            data-aos-duration="1000">
                            <div className="sus__blog__img">
                                <Image src="/assets/img/renewable_energy.jpg" alt="energy" layout='fill' object-fit='contain'/>
                            </div>
                            <div className="sus__blog__info">
                                <h4>Renewable Energy</h4>
                                <p>We support the storage and usage of clean and renewable energy amongst our local
                                    partner spaces in order to provide adequate energy supplies by</p>
                                {/* <Link href="#"><a>Learn More <i className="fa fa-arrow-right"></i></a></Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	     </>
	    )

}
export default Sustainability;