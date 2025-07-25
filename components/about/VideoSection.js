import {useEffect} from "react";
import Link from "next/link";
const VideoSection=(props)=>{
const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);
return (
          <>
          <section className="about__video__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="about__video__left" data-aos="zoom-in" data-aos-delay="80" data-aos-duration="1300">
                            <div className="about__video__title">
                                <h2>How We Started</h2>
                            </div>
                            <div className="about__video__wrap">
                                <div className="about__video__main">
                                    <img src="assets/img/arrow_top.svg" className="video__arrow" alt=""/>
                                    <img className="video__img" src="assets/img/about__video.png" alt=""/>
                                    <Link href="https://www.youtube.com/watch?v=IUN664s7N-c"><a data-maxwidth="880px"
                                        data-vbtype="video" className="venobox"><i className="fas fa-play"></i></a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="about__video__right" data-aos="fade-left" data-aos-delay="50"
                            data-aos-duration="1000">
                            <h4>How a simple idea helped us<br/>become what we are today</h4>
                            <p>Encamp is a travel company, founded in 2019, with the simple intention of offering travelling opportunities to offbeat locations without the stress of it. And while we were on this journey we realised that it was also our responsibility to protect these locations, thats when Encamp truly became whole.</p>
                            <div className="about__video__right__single">
                                <div className="about__video__icon">
                                    <img src="assets/img/a1.svg" alt=""/>
                                </div>
                                <div className="about__video__single__info">
                                    <h4>Personalised experiences</h4>
                                </div>
                            </div>
                            <div className="about__video__right__single">
                                <div className="about__video__icon">
                                    <img src="assets/img/a3.svg" alt=""/>
                                </div>
                                <div className="about__video__single__info">
                                    <h4>Handpicked experiences</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
          </>
	    )

}
export default VideoSection;