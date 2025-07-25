import {useState,useEffect} from "react";

const InformationArea=(props)=>{
const [newconstant,setNewconstant] = useState({inclue:[],exclue:[]});
const {AOS,base_url,constant} = props;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, []);

useEffect(()=>{
let inclustring = constant.inclusions[0].label || "";
let exclusionstring = constant.exclusions[0].label || "";
let inarr = [];
let exarr = [];
if(inclustring.includes(",")){
    inclustring.split(",").map((ind)=>{
inarr = [...inarr,ind];

    })
}else{
inarr = [inclustring];  
}

if(exclusionstring.includes(",")){
    exclusionstring.split(",").map((ind)=>{
exarr = [...exarr,ind];

    })
}else{
exarr = [exclusionstring];  
}

setNewconstant({inclue:inarr,exclue:exarr});


},[constant])

return (
	<>
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
                                          {newconstant && newconstant.inclue.length > 0 ? newconstant.inclue.map((kas ,k)=>{
                                                return (
                                                        
                                                         <li  key ={"nhhh" + k}><i className="fa fa-check"></i>{kas}</li>

                                                  )

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
                                          
                                            {newconstant && newconstant.exclue.length > 0 ? newconstant.exclue.map((kas ,key)=>{
                                                return (
                                                      <li  key ={"erer" + key}><i className="fa fa-times"></i>{kas}</li>
                                                       )
                                              }):""}
                                        </ul>
                                    </div>
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
export default InformationArea;