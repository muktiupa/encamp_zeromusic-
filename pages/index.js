import { useState, useEffect } from "react";
import HtmlHead from "../components/common/HtmlHead";
import Header from "../components/common/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSlider from "../components/home/HeroSlider";
import Review from "../components/home/Review";
import ShowCalculator from "../components/home/ShowCalculator";
import Supported from "../components/home/Supported";
import Packagearea from "../components/home/Packagearea";
import { searchDatafromweb } from "../components/search/data/searchdata";
import { Tagmanageri } from "../components/common/tagmanageri";
import EnquiryComponents from "../components/common/EnquiryComponents";
import sendMail from "../function/sendMail";
import Contactform from "../components/common/Contactform";
import ExperienceItenaryList from "../components/home/ExperienceItenaryList";
import WhyEncamp from "../components/home/WhyEncamp";
import Sustainability from "../components/home/Sustainability";
import Testimonial from "../components/home/Testimonial";
import Mediaarea from "../components/home/Mediaarea";
import Footer from "../components/common/Footer";
import ReferralNotification from "../components/common/ReferralNotification";


const Index = () => {
  const [toggle, setToggle] = useState(false);
  //const {itenary} = data ? data : [];
  const [itenary, setItenary] = useState([]);
  const base_url = process.env.BASEURL;
  const [loading, setLoading] = useState(false);


  const arraylimiter = (arr, limiter) => {
    const slice = arr.slice(0, limiter);
    return slice;
  };

  useEffect(() => {
    const datacsr = async () => {
      const dataPromise = searchDatafromweb();
      let data = await dataPromise;
      if (data) {
        let iten = data.itenary ? data.itenary : [];
        let filter = [];
        iten &&
          iten.length > 0 &&
          iten.map((i, k) => {
            if (i.isfeatured === true) {
              filter = [...filter, i];
            }
          });

        setItenary(arraylimiter(filter, 5));
        setLoading(false);
      }
    };
      setLoading(true);
      datacsr();
      Tagmanageri();
  }, []);

  return (
    <>
      <HtmlHead base_url={base_url} />
      <Header />
      <ReferralNotification/>
          <EnquiryComponents toggle={toggle} setToggle={setToggle} />
          <Contactform
            AOS={AOS}
            sendMail={sendMail}
            toggle={toggle}
            setToggle={setToggle}
            Tagmanageri={Tagmanageri}
          />
          <HeroSlider AOS={AOS} />
          {/* <DisplayBanner /> */}
          {!loading && itenary.length > 0 ? (
            <ExperienceItenaryList AOS={AOS} itenary={itenary} />
          ) : (
            ""
          )}

          <Packagearea AOS={AOS} setToggle={setToggle} />
          <WhyEncamp AOS={AOS} />
          <Sustainability AOS={AOS} />
          <Review AOS={AOS} />
          <Testimonial AOS={AOS} />
          <Supported AOS={AOS} />
          <Mediaarea AOS={AOS} />
          <ShowCalculator AOS={AOS} />
      <Footer />
  </>
  )
};
export default Index;
