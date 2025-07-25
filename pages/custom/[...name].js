import { useRouter } from 'next/router';
import adminapi from "../../api/adminapi";
import {useState,useEffect} from 'react';
import HtmlHead from '../../components/common/HtmlHead';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Link from 'next/link';
import AOS from "aos";
import Login from "../../components/common/login";
import SliderSection from "../../components/custom/SliderSection";
import TripDetails from "../../components/custom/TripDetails";
import BeautySection from "../../components/custom/BeautySection";
import LastSection from "../../components/custom/LastSection";
import Faq from "../../components/faq/Faq";
import sendMail from "../../function/sendMail";
import Contactform from "../../components/custom/Contactform";
import BookingEnquiry from "../../components/common/BookingEnquiry";
import {Tagmanageri} from "../../components/common/tagmanageri";
import Loading from "../../components/common/Loading";

const Custom=({data,base_url})=>{
  const [checklogin,setChecklogin] = useState(false);
  const router = useRouter();
  const { name } = router.query;
  const images = data && data.length > 0 && data[0].images ? data[0].images : null;
  const description = "test page"; 
  const summery = "test page"; 
  const names = "test page"; 
  const start = "2024-05-01"
  const end = "2024-05-31"
  const [error,setError] = useState({start:'',end:'',travellers:'',firstName:"",lastName:"",contact:"",email:"",carbonproject:'',bookedItenary:'',advance:'',rooms:''});
  const [toggle,setToggle] = useState(false);
  const [toggles,setToggles] = useState(false);
  const [isChecked,setIsChecked] = useState(false);
  const [salert,setSalert] = useState({sucess:'',fail:''});
  const [bloading,setBloading] = useState(false);
  const [loading,setLoading] = useState(false);
  const [alldata,setAlldata] = useState("");
  const [successpage, setSuccesspage] = useState("");



const todate=(val)=>{
let today = val ? val : new Date();

let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
return today;

}

const getLocationDetails=()=>{
 
 return "test";

}


const validateEmail=(emails)=>{
let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

if(emails.match(validRegex)){
    return true;
}else{
    return false;
}

}


useEffect(() => {
    Tagmanageri();
  }, []);


  return (
     <>
      <Loading forceloading = {loading}/>
      <HtmlHead urlx ={router.asPath} images={images} metaData={data && data.length > 0 && data[0] && data[0].metaData ? data[0].metaData : null}/>
      <Header theme={'light'} base_url={base_url}/>
             {successpage === "" ? (
        <>
          <Contactform
                AOS={AOS}
                Tagmanageri={Tagmanageri}
                toggle={toggles}
                setToggle={setToggles}
                successpage={successpage}
                setSuccesspage={setSuccesspage}
                sendMail={sendMail}
                name={names}
              />
        <SliderSection AOS={AOS} images={images} base_url={base_url} name={names}  totalprice={100}/>
        <TripDetails AOS={AOS} base_url={base_url} sociallinking={data && data[0] && data[0].sociallinking ? data[0].sociallinking : null } setToggle={setToggle} toggle={toggle} description={description} summery={summery} totalcf={100} nameite={data[0].name} totalpricetag={"dsdsdsdddsdsdsdsdsd sdsd"} locationdetails={getLocationDetails()} setToggles={setToggles} toggles={toggles} />
        <Faq faqdata = {data && data.length > 0 && data[0] && data[0].faq ? data[0].faq : ''}/>
        <LastSection AOS={AOS} base_url={base_url}/>
        </>
          ) : (
          <BookingEnquiry
              AOS={AOS}
              base_url={base_url}
              successpage={successpage}
          />
          )}
         <Footer/>
     </>
     )

}


export default Custom;


export async function getServerSideProps(context) {
const base_url = process.env.BASEURL;
const {name} = context.query;
 try {
    const res = await adminapi.get(`/event/${name[1]}`);
    let namecv = res && res.data[0].name;
    let nameurl = namecv ? namecv.replace(/\s+/g, '-').toLowerCase() : null; 
    if(!nameurl){
      return {
        notFound: true,
      };
    }

  {/*  if (nameurl && nameurl !== name[0]) {
      return {
        notFound: true,
      };
    }*/}

    return {
      props: {
        data: res.data,
        base_url: base_url,
      },
    };
  }catch (error) {
    console.error('API request error:', error);
    return {
      props: {
        error: 'An error occurred while fetching data.',
      },
    };
  }

}

