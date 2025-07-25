import{useEffect} from "react";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Image from 'next/image';

const SliderAbout=(props)=>{
const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);

return (
	    <>
	        <section className="hero__area about__hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="about__hero__content" data-aos="fade-up" data-aos-delay="50"
                            data-aos-duration="1000">
                            <h2>Encamp Adventures</h2>
                            <p>We are a purpose-driven travel enterprise offering hassle-free, end-to-end experiences. A
                                signatory to the Tourism Declares a Climate Emergency.</p>
                            <p>We curate memorable adventure vacations for people who are looking for meaningful ways to spend their time off.</p>
                        </div>
                         <div className="about__hero__slider" data-aos="fade-up" data-aos-delay="50"
                            data-aos-duration="1000">
                         <AwesomeSlider mobileTouch={true} bullets={false}>
                                <div className="itinerary__single__content about">
                                    <Image src="/assets/img/team_encamp.jpg" alt='team_encamp' object-fit='contain' layout='fill'/>
                                </div>
                               <div className="itinerary__single__content about">
                                    <Image src="/assets/img/e3.jpg" alt='team_encamp' object-fit='contain' layout='fill'/>
                                </div>


                         </AwesomeSlider>
                         </div>
                       
                        <div className="about__hero__content2" data-aos="fade-up" data-aos-delay="50"
                            data-aos-duration="1000">
                            <p>We at Encamp Adventures, celebrate natures uniqueness by giving you an adventure, specially catered to not just have to visit the place but experience a journey.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	    </>
	    )


}
export default SliderAbout