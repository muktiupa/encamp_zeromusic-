import {useEffect} from "react";
import Link from "next/link";
const Subscription =(props)=>{

const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);

return (
	    <>
	       <section className="subscribe__area">
            <div className="container">
                <div className="subscribe__wrap" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <div className="subscribe__img__blk">
                                <img src="assets/img/subscribe__img.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8">
                            <div className="subscribe__content__blk">
                                <h4>Want to partner with us?</h4>
                                <p>Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Donec id elit
                                    non mi porta gravida at eget metus. Duis mollis, est non commodo luctus.</p>
                                <form action="">
                                    <div className="subscribe__form__blk">
                                        <input type="email" placeholder="Enter your mail"/>
                                        <button type="submit">Get Started!</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

	    </>
	    )

}
export default Subscription;