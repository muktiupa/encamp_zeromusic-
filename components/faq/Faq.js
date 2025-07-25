import {useState,useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';


export const Faqs=({data , id})=>{
 const [sign , setSign] = useState({plus:'&#10010;',cross:'&#10062;'})
 const [tooglew , setTogglew] = useState(false);
	const styles = {
		question:{fontSize:"1rem",fontWeight:"500",paddingBottom: '15px'},
		answer:{fontSize:"1rem",fontWeight:"300",paddingLeft:"10px",paddingBottom: '20px'},
		plus:{color:"#1e9771",marginLeft: '5px',fontSize:"1.2rem",float:"right",cursor:"pointer"}
	}
const toggle=(e)=>{
	setTogglew((prev)=>!prev);

}

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
  }, [AOS]);

return(
	<> 
         {data.question !=="" ? 
            <div onClick={(e)=>toggle(e)} id={"as" + id} key={"as" + id} style={{borderRadius:"10px",borderBottom:"0.2px solid grey",marginBottom:"15px",cursor:'pointer'}} >
               <div id={"asd" + id} key={"asd" + id} className="question" style={styles.question} >
                    <span key={"asds" +id} style={{color:"green",marginRight: '10px'}}>Q. 
                      </span> 
                      {data.question} 
                       <span id={"asfd" + id} key={"asfd" + id} style={styles.plus}
                          dangerouslySetInnerHTML={{__html: !tooglew ? sign.plus : sign.cross}}>
                       </span>
               </div>

               { tooglew && <div id={id} key={"asdss" +id} className="answer" style={styles.answer}>{data.answer}</div>}             
           </div>
           :''
         }	
	</>
	)
}


const Faq=(props)=>{
const {faqdata , disableheader = false} = props;
const [faqss,setFaqss] = useState([]);

useEffect(()=>{
setFaqss(faqdata);
},[])  

return(
<>
{ faqss && faqss.length > 0 && faqss[0].question !== "" ? 
<section  id="tripdetails" className="details__area w-100">
   <div className="container">
         <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
             <div className="print__content" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                  {!disableheader && <h4>FAQ</h4>}
               {(faqss || faqss.length > 0) ? faqss.map((d,id)=>{
               	return <Faqs key={"sdsd" + id} data={d} id={id}/>		
               }):""}
             </div>
            </div>
         </div>
   </div>
</section>
: ''
}
</>
)

}

export default Faq;