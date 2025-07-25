import {useEffect} from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';

const Places=(props)=>{

const {AOS} = props;
const router = useRouter();

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);

const explore=(str)=>{
router.push(`/experience/?destination=${str}`);
}

return ( 
	    <section className="service__area" style={{paddingTop:'0'}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="service__thumb">
                        <Image src="/assets/img/service_1.png" alt="sdsdsd" object-fit='contain' layout='fill'/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="service__content service__content__left__space mb-4">
                        <h4>Sikkim</h4>
                        <p>Watch the clouds dance around peaks that whisper with the sky, with rivers flashing against the rocks beneath. Attain moksha during the day at the most beautiful monasteries and count the stars in each constellation by the night. Plan your next vacation in Sikkim.</p>
                        {/* <button className="common__btn" style={{border:'none'}} onClick={()=>explore('sikkim')}>Explore Destination</button> */}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 order-lg-2">
                    <div className="service__thumb">
            
                        <Image src="/assets/img/service_2.png" alt="sdsdsd" object-fit='contain' layout='fill'/>
                    </div>
                </div>
                <div className="col-lg-6 order-lg-1">
                    <div className="service__content service__content__right__space mb-4">
                        <h4>Nagaland</h4>
                        <p>Let the ingenious mix of cultures welcome you to a state of unexplored treasures. Witness the vibrant blend of Naga cultures at the Hornbill Festival with aplenty adventure activities and the magical Dzuko Valley trek that give you the thrills. Experience the hobbit life at India’s greenest village, Khonoma. Come home to Nagaland.</p>
                        {/* <button className="common__btn" style={{border:'none'}} onClick={()=>explore('nagaland')}>Explore Destination</button> */}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="service__thumb">
                        
                        <Image src="/assets/img/service_3.png" alt="sdsdsd" object-fit='contain' layout='fill'/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="service__content service__content__left__space mb-4">
                        <h4>Arunachal Pradesh</h4>
                        <p>Watch the stunning snow-capped peaks embellish and preserve the pristine beauty of nature. Discover countless sights that become your reasons to visit and revisit Arunachal Pradesh at Tawang that always greets you with its heavenly, panoramic views.</p>
                        {/* <button className="common__btn" style={{border:'none'}} onClick={()=>explore('arunachal pradesh')}>Explore Destination</button> */}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 order-lg-2">
                    <div className="service__thumb">

                        <Image src="/assets/img/service_4.png" alt="sdsdsd" object-fit='contain' layout='fill'/>
                    </div>
                </div>
                <div className="col-lg-6 order-lg-1">
                    <div className="service__content service__content__right__space mb-4">
                        <h4>Meghalaya</h4>
                        <p>A state of unmatched beauty, Meghalaya rests sweet and cosy in the lap of nature. Scotland of the East, the state is a haven of impressive lakes and lush rolling hills. It’s home to India’s cleanest village and the planet’s wettest village with one of the finest craftsmanship, wood carving and artistic weaving to cast a spell on you.</p>
                        {/* <button className="common__btn" style={{border:'none'}} onClick={()=>explore('meghalaya')}>Explore Destination</button> */}
                    </div>
                </div>
            </div>
        </div>
    </section>
	    )

}
export default Places;