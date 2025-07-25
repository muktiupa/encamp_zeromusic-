import{useState,useEffect} from "react";
import Link from 'next/link';

const Faqcomp=(props)=>{
const {AOS,faqdata,addstyle} = props;
const [tooglew , setTogglew] = useState(false);
const [checkid,setCheckid] = useState('');

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, 


  []);
const openToggle=(id)=>{
setTogglew((prev)=>!prev);
setCheckid(id);
}

return (
	    <>
	   <section className="faq__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="faq__title" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <h2 style={addstyle ? addstyle : '' }>Frequently Asked Questions</h2>
                        </div>
                    </div>
                </div>

            <div className="row">

            {
                (faqdata.faq && faqdata.faq.length > 0) ? faqdata.faq.map((aq,key)=>{

                     return ( 
                     <div className="col-lg-12" key={key}>
                        <div className="faq__main__blk" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <div className="accordion" id="accordionExample">
                                  
                                   <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className={tooglew && aq._id  === checkid ? "accordion-button":"accordion-button collapsed"} type="button" onClick={()=>openToggle(aq._id)}>
                                            {tooglew && aq._id  === checkid ? <i className="fas fa-minus" style={{opacity: 1}} ></i> : <i className="fas fa-plus" style={{opacity: 1}} ></i>}
                                            {aq.question || ""}
                                        </button>
                                    </h2>
                                    {tooglew && aq._id  === checkid ? <div id={aq._id} className="accordion-collapse collapse show"><div className="accordion-body">{aq.answer || ""}</div></div>:""}
                                </div>


                            </div>
                        </div>
                    </div>
                            )

                })
                  
            :""}
            </div>
            </div>
        </section>

	    </>
	    )

}
export default Faqcomp;