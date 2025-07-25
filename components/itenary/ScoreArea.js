import {useEffect,memo} from "react";
import Image from 'next/image';

const ScoreArea=(props)=>{

const {AOS,base_url,totalcf} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);

return (
        <section className="score__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="score__wrap">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="score__img__blk" data-aos="fade-up" data-aos-delay="50"
                                        data-aos-duration="1000">
                                        <Image src={`/assets/img/tree.svg`} alt="tree.svg" object-fit='contain' layout='fill'/>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="score__right__blk" data-aos="fade-down" data-aos-delay="50"
                                        data-aos-duration="1000">
                                        <span>Carbon Footprint:{totalcf}</span>
                                        <h2>Encamp is committed to reduce your carbon footprint by  <span>planting {((totalcf/+1000)*31).toFixed(0)} trees
                                                for this
                                                trip.</span></h2>
                                        <p>1 tree absorbs approx 0.22 ton CO2 per year
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	    )

}

export default memo(ScoreArea);