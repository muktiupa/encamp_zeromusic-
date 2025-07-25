import {useEffect , memo} from "react";
import Link from "next/link";

const PrintArea=(props)=>{

const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);

return ( <section className="print__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
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
                                <Link href="/cancellation-policy" passHref><a target="_new">Read more</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>)

}
export default memo(PrintArea);