import{useEffect} from "react";
import Link from 'next/link';

const EnqirySection=(props)=>{
const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, []);

return (
	    <>
	   <section className="enqiry__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="enqiry__topbar" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <h2>Our loyalists remember us by our destinations.</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                a page when looking at its layout. The point of using Lorem Ipsum is that it has.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="enqiry__single__blk" data-aos="zoom-in" data-aos-delay="50"
                            data-aos-duration="1000">
                            <div className="enqiry__single__topbar">
                                <div className="enqiry__single__wrap">
                                    <div className="enqiry__ico">
                                        <img src="assets/img/light.svg" alt=""/>
                                    </div>
                                    <div className="enqiry__single__title">
                                        <h4>General Enqiry</h4>
                                    </div>
                                </div>
                                <div className="enqiry__right__arrow">
                                   <Link href="#"><i className="fa fa-arrow-right"></i></Link>
                                </div>
                            </div>
                            <div className="enwiry__single__content">
                                <p>You will need to apply for a special permission before entering Dowki river
                                    sanctuary. Our team will help you in that</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="enqiry__single__blk" data-aos="zoom-in" data-aos-delay="50"
                            data-aos-duration="1000">
                            <div className="enqiry__single__topbar">
                                <div className="enqiry__single__wrap">
                                    <div className="enqiry__ico">
                                        <img src="assets/img/light.svg" alt=""/>
                                    </div>
                                    <div className="enqiry__single__title">
                                        <h4>Partnership Enquiries</h4>
                                    </div>
                                </div>
                                <div className="enqiry__right__arrow">
                                    <Link href="#"><i className="fa fa-arrow-right"></i></Link>
                                </div>
                            </div>
                            <div className="enwiry__single__content">
                                <p>You will need to apply for a special permission before entering Dowki river
                                    sanctuary. Our team will help you in that</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="enqiry__single__blk" data-aos="zoom-in" data-aos-delay="50"
                            data-aos-duration="1000">
                            <div className="enqiry__single__topbar">
                                <div className="enqiry__single__wrap">
                                    <div className="enqiry__ico">
                                        <img src="assets/img/light.svg" alt=""/>
                                    </div>
                                    <div className="enqiry__single__title">
                                        <h4>General Enqiry</h4>
                                    </div>
                                </div>
                                <div className="enqiry__right__arrow">
                                    <Link href="#"><i className="fa fa-arrow-right"></i></Link>
                                </div>
                            </div>
                            <div className="enwiry__single__content">
                                <p>You will need to apply for a special permission before entering Dowki river
                                    sanctuary. Our team will help you in that</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

	    </>
	    )

}
export default EnqirySection;