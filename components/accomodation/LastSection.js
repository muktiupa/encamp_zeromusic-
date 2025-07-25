import{useEffect} from "react";
const LastSection=(props)=>{

const {AOS,base_url} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, []);


return (

	     <section className="booking__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="booking__content" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <img src={`${base_url}/assets/img/a3.svg`} alt=""/>
                            <h2>Encamp plants a tree for every booking that happens through us.</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	   )
}
export default LastSection;