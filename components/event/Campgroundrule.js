import {useState,useEffect} from "react";

const Campgroundrule=({rules , AOS})=>{
const [isLess,setIsLess] = useState(true);

const getShortdescription=(desc)=>{
let shortdes = desc.indexOf('</p>');
if(shortdes !== -1 && shortdes <= 500){
  return desc.substr(0,shortdes) + " ...... "; 

}else{
    return desc.substr(0,500) + " ...... ";
}


}

return (
	   <>
	   {rules && rules !== "" ? 
	   <div className="container">
       <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h4>Camp Ground Rules</h4>
              <div className="container px-1" dangerouslySetInnerHTML={{ __html: isLess ? getShortdescription(rules) :rules }}></div>
                    <div className="trip_tab_btn" style={{marginTop:'-2rem'}}>
                        <div onClick={()=>setIsLess(!isLess)} style={{cursor:'pointer',color:'#34CC9C'}}><a style={{fontSize:'18px',fontWeight: '600'}}>{isLess ? 'Read More' : 'Read Less'}<i className="fa fa-chevron-right"></i></a></div>
                    </div>
               
            </div>
          </div>
        </div>
      </div> : ''}
      </>

	   )

}
export default Campgroundrule;