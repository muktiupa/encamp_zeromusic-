import{useState,useEffect} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import adminapi from "../../api/adminapi";
import dynamic from 'next/dynamic';
import Link from "next/link";
import Image from 'next/image';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});
const BeautySection=(props)=>{
const {AOS,base_url,activitydata,images,otherdetails} = props;
const separators = /[-,|/\\]/;
const [customerinfo,setCustomerinfo] = useState([]);

useEffect(()=>{
if(otherdetails && otherdetails.guestinfo && otherdetails.guestinfo !==""){
let dsx = otherdetails.guestinfo.split(separators);
if(dsx && dsx.length > 0){
   setCustomerinfo(dsx);
}
}
},[otherdetails]);

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
var $ = require('jquery');
if (typeof window !== 'undefined') {
   window.$ = window.jQuery = require('jquery');
}

  }, []);


const responsive={
                0:{
                    items: 1
                },
                600:{
                    items: 1
                },
                1000:{
                    items: 3
                }
                }

return (<section className="beauty__area" id="beauty">
            <div className="container">
                <div className="row">
                  { images && images.length > 2 && 
                    <div className="col-lg-8">
                        <div className="beauty__wrap">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="beauty__topbar" data-aos="fade-right" data-aos-delay="50"
                                        data-aos-duration="1000">
                                        <h2 style={{fontSize:'2rem'}}>What to expect</h2>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                 <OwlCarousel   className="beauty__main__slider" responsive={responsive}  loop = {true}  responsiveClass= {true} nav = {true} navText={ ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}  dots={false} margin={20} >
                                  
                                    {
                                    images && images.length > 0 ? images.map((img,key)=>{
                                        if(key > 2 && img !==''){

                                      return (
                                         <div key={key} className="beauty__single__slide">
                                            <Image src={img} alt="activity" layout="fill" objectFit="cover"/>
                                        </div>)
                                    }

                                    }):  
                                        <div className="beauty__single__slide">
                                            <Image src={`${base_url}/assets/img/beauty1.jpg`} alt="dd" objectFit = "cover" layout="fill"/>
                                        </div>
                                    
                                    }
                              
                                    </OwlCarousel>
                                </div>
                            </div>
                        </div>
                    </div>
                   }
              {customerinfo.length > 0 ? 
                    (<div className="col-lg-4">
                        <div className="sitebar2__main__blk" style={{top:'0'}}>
                            <div className="sitebar2_title__blk">
                                <h4>Things to Know</h4>
                            </div>
                            <div className="sitebar__requirment__blk">
                               
                                <div className="requirments__content">
                                    <p>
                                    {customerinfo.length > 0 ? customerinfo.map((lsx,kk)=>{
                                        if(lsx !== ''){
                                        return (
                                                <li key={kk}>{lsx}</li>
                                               )
                                             }
                                    }):''}
                                    </p>
                                </div>
                              
                            </div>
                     
                        </div>
                    </div>
                     ): ''}
                </div>
            </div>
        </section>)

}
export default BeautySection;