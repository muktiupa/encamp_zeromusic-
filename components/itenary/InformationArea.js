import {useState,useEffect,memo} from "react";


const InformationArea=(props)=>{
const [newconstant,setNewconstant] = useState({inclue:[],exclue:[]});
const {AOS,constant} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);

useEffect(()=>{
if(constant && constant.length > 0){
const result = constant.reduce((acc, item) => {
  acc.inclusions.push(item.inclusion);
  acc.exclusions.push(item.exclusion);
  return acc;
}, { inclusions: [], exclusions: [] });

setNewconstant(result);
}
},[constant])

return (
	<>
     { (newconstant.inclusions && newconstant.inclusions.length > 0) ||
         (newconstant.exclusions && newconstant.exclusions.length > 0) ? 
	     <section className="information__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                      
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="inclutions__blk" data-aos="fade-up" data-aos-delay="50"
                                    data-aos-duration="1000">
                                    <div className="inclutions__title">
                                        <h4>Inclusions</h4>
                                    </div>
                                    <div className="inclution__content" data-aos="fade-up" data-aos-delay="50"
                                        data-aos-duration="1000">
                                        <ul>
                                          {newconstant && newconstant.inclusions && newconstant.inclusions.length > 0 ? newconstant.inclusions.map((kas ,k)=>{
                                                if(kas !== ""){
                                                      return (
                                                        
                                                         <li  key ={"nhhh" + k}><i className="fa fa-check"></i>{kas}</li>

                                                  )


                                                }
                                              
                                              }):""}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="inclutions__blk" data-aos="fade-up" data-aos-delay="50"
                                    data-aos-duration="1000">
                                    <div className="inclutions__title">
                                        <h4>Exclusions</h4>
                                    </div>
                                    <div className="inclution__content exclutions">
                                        <ul>
                                          
                                            {newconstant && newconstant.exclusions && newconstant.exclusions.length > 0 ? newconstant.exclusions.map((kas ,key)=>{
                                            if(kas !== ""){
                                                return (
                                                     
                                                      <li  key ={"erer" + key}><i className="fa fa-times"></i>{kas}</li>
                                                         
                                                       )
                                                  }
                                              }):""}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> : ''
      }  
    </>
	   )
}
export default memo(InformationArea);