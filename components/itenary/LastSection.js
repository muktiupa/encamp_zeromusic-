import{useEffect,memo} from "react";
import Image from 'next/image';

const LastSection=(props)=>{

const {AOS,base_url} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);


return (

	     <section className="booking__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="booking__content" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <div><Image src={`/assets/img/a3.svg`} alt="a3.svg" object-fit='contain' layout='fill'/></div>
                            <h2>Encamp plants a tree for every booking that happens through us.</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	   )
}
export default memo(LastSection);