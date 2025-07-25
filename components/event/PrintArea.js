import{useEffect} from "react";
import Link from "next/link";

const PrintArea=(props)=>{

const {AOS,base_url} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, []);

return ( <section className="print__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="print__content" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <h4>Cancellation Policy</h4>
                            <p>While it would make us feel sad if you have to cancel your booking with us due to unforeseen reason.</p>
                            <p>We can understand that life can be unpredictable at times and we hope that you would give us
a chance to serve you at your convenience in the future. </p>
                            <p>In case of cancellations, please drop a mail at: support@encampadventures.com</p>
                                <div>8 - 15 days prior to checkin 50% refund.</div>
                                <div>4 - 7 days prior to checkin 10% refund.</div>
                                <div>Less than 3 days prior to checkin 0% refund.</div>
                                <Link href="/cancellation-policy" passHref><a target="_new">Read more</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>)

}
export default PrintArea;