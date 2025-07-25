import {useState,useEffect} from 'react';
import HtmlHead from '../components/common/HtmlHead';
import Header from '../components/common/Header';
import Link from 'next/link';
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from '../components/common/Footer';
import Banner from "../components/faq/Banner";
import EnqirySection from "../components/faq/EnqirySection";
import Faqcomp from "../components/faq/Faqcomp";
import ContactSection from "../components/faq/ContactSection";
import adminapi from "../api/adminapi";
import Login from "../components/common/login";
import {Tagmanageri} from "../components/common/tagmanageri";

const Contactus=({faqdata})=>{
const [checklogin,setChecklogin] = useState(false);


useEffect(()=>{
Tagmanageri();

},[]);

return (
	    <>
	     <Login setChecklogin={setChecklogin}/>
	     <HtmlHead/>
         <Header theme={'light'}/>
         <Banner AOS={AOS}/>
         <EnqirySection AOS={AOS}/>
         <div className="container">
           <div className="row">
              <div className="col-md-8">
                <Faqcomp AOS={AOS} faqdata={faqdata} addstyle={{textAlign:'left'}}/>
              </div>
             <div className="col-md-4">
               <ContactSection/>
             </div>
            </div>
          </div>
         <Footer/>

	    </>
	    )

}
export default Contactus;

export async function getServerSideProps() {
const response = await adminapi.get("/queryfaq?category=encamp");

if(response.data){
	return { props: { faqdata:response.data} }
}

}