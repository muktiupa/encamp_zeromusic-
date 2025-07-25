import{useEffect , memo} from "react";
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
                            <p>While it would make us sad if you had to cancel your trip with us due to unforeseen
situations, we can understand that life can be unpredictable at times and we hope you would give us a chance to serve you again at your convenience.
</p>
                            <p style={{color:'red'}}>However, bookings for camping at ZFM are non refundable. </p>
                           
                              
                        </div>
                    </div>
                </div>
            </div>
        </section>)

}
export default memo(PrintArea);