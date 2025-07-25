import {useEffect} from "react";
import Link from "next/link";
import Image from 'next/image';

const TeamSection=(props)=>{
const {AOS} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);


return (
	    <>
	       <section className="team__area">
            <div className="container">
                <div className="row">
                    <div className="co-lg-12">
                        <div className="team__topbar" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <h2>The Encamp Team</h2>
                            <p>Backed by our commitment to unparalleled service, our experienced team takes you on your most unforgettable adventures </p>
                        </div>
                        <div className="team__wrap" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <div className="team__single__blk">
                                <div className="team__img__blk">
                                    <Image src="/assets/img/tm1.jpg" alt="tm" object-fit='contain' layout='fill'/>
                                </div>
                                <div className="team__info">
                                    <h4>Jmaes Cameroon</h4>
                                    <p>Founder</p>
                                </div>
                            </div>
                            <div className="team__single__blk">
                                <div className="team__img__blk">
                                    <Image src="/assets/img/tm2.jpg" alt="tm" object-fit='contain' layout='fill'/>
                                </div>
                                <div className="team__info">
                                    <h4>John Doe</h4>
                                    <p>CTO</p>
                                </div>
                            </div>
                            <div className="team__single__blk">
                                <div className="team__img__blk">
                                    <Image src="/assets/img/tm3.jpg" alt="tm" object-fit='contain' layout='fill'/>
                                </div>
                                <div className="team__info">
                                    <h4>Sam Hanks</h4>
                                    <p>Lead Designer</p>
                                </div>
                            </div>
                            <div className="team__single__blk">
                                <div className="team__img__blk">
                                     <Image src="/assets/img/tm4.jpg" alt="tm" object-fit='contain' layout='fill'/>
                                </div>
                                <div className="team__info">
                                    <h4>Jmaes Cameroon</h4>
                                    <p>Founder</p>
                                </div>
                            </div>
                            <div className="team__single__blk">
                                <div className="team__img__blk">
                                     <Image src="/assets/img/tm5.jpg" alt="tm" object-fit='contain' layout='fill'/>
                                </div>
                                <div className="team__info">
                                    <h4>Ratul Ahmed</h4>
                                    <p>Ux Ui Designer</p>
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
export default TeamSection;