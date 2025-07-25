import {useState , useEffect} from 'react';
import HtmlHead from '../components/common/HtmlHead';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Link from 'next/link';
import AOS from "aos";
import "aos/dist/aos.css";
import SliderAbout from "../components/about/SliderAbout";
import VideoSection from "../components/about/VideoSection";
// import Subscription from "../components/about/Subscription";
import ServiceArea from "../components/about/ServiceArea";
import Supported from "../components/home/Supported";
//import TeamSection from "../components/about/TeamSection";
import Login from "../components/common/login";
import {Tagmanageri} from "../components/common/tagmanageri";

const About =()=>{
const [checklogin,setChecklogin] = useState(false);

useEffect(()=>{
Tagmanageri();

},[]);

return (
	   <>
       <Login setChecklogin={setChecklogin}/>
	   <HtmlHead/>
       <Header/>
       <SliderAbout AOS ={AOS}/>
       <VideoSection AOS ={AOS}/>
       {/* <Subscription AOS ={AOS}/> */}
       <ServiceArea AOS ={AOS}/>
       {/* <TeamSection AOS={AOS}/> */}
       <Supported AOS={AOS}/>
       <Footer/>
	   </>
	   )
}
export default About;