import{useEffect} from "react";
import Link from 'next/link';

const Banner=(props)=>{
const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, []);

return (
	    <>
	     <section className="faq__hero__area" style={{backgroundImage: "url('assets/img/faq__hero__bg.jpg')"}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-8">
                        <div className="faq__hero__content" data-aos="fade-left" data-aos-delay="50"
                            data-aos-duration="1000">
                            <h1>Want to talk to us?</h1>
                            <p>We are a purpose-driven travel enterprise offering hassle-free, end-to-end experiences. A
                                signatory to the Tourism Declares a Climate Emergency, our itineraries help you discover
                                a lot more than the offbeat locations.</p>
                            <div className="faq__hero__btn">
                                <Link href="https://wa.me/919643182259"><a className="common__btn">Chat With Us</a></Link>
                                {/*<Link href="#"><a className="common__btn">Submit a Support Ticket</a></Link>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

	    </>
	    )

}
export default Banner;