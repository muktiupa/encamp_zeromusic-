import{useState,useEffect} from "react";
import adminapi from "../../api/adminapi";
import Link from "next/link";


const Required=(props)=>{
const {AOS,base_url,activitydata} = props;
const [sliderImages,setSliderImages] = useState([]);


useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();



const getActivity = async()=>{

let res = await adminapi.get(`/getactivities/?id=${activitydata.toString()}`);
if(res.data && res.data.length > 0){
    let data = res.data;
let imgfilter = [];

 data.map((obj)=>{
    if(obj.images[0] !=="" &&  obj.name !==""){
       imgfilter = [...imgfilter,{url:obj.images[0] || "",name:obj.name}];
    }
 })



setSliderImages(imgfilter);

}

}
getActivity();

  }, []);


return (
    <section className="information__area">
     { sliderImages.length > 0 ?
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="itinerary__title__main" data-aos="fade-up" data-aos-delay="50"
                            data-aos-duration="1000">
                            <h2 style={{fontSize:'2rem'}}>Activites Nearby</h2>
                            <div className="itinerary__line__blk"></div>
                        </div>
                        <div className="information__wrap" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            { (sliderImages.length > 0) ? sliderImages.map((img,key)=>{
                             if(img.url !== "" && img.name !==''){
                          
                                return (
                                       
                                         <div key={key} className="information__single__blk position-relative">
                                           <img src={img.url === "" ? `${base_url}/assets/img/placeholder.jpg`:img.url } alt="image"/>
                                           <Link href="#"><a className="stretched-link">{img.name}</a></Link>
                                          </div>
                                       )
                                    

                              }})
                            	 : ""
                            }
                       
                        
                        </div>
                    </div>
                </div>
            </div>
            :''}
        </section>
        )

}
export default Required;