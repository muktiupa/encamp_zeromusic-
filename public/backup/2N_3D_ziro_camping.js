import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "../components/common/login";
import SliderSection from "../components/zfm/SliderSection";
import LastSection from "../components/itenary/LastSection";
import ScoreArea from "../components/zfm/ScoreArea";
import Faq from "../components/faq/Faq";
import { Datafaq } from "../components/faq/Datafaq";
import { initializeRazorpay } from "../components/razorpay/initializerazorpay";
import { Tagmanageri } from "../components/common/tagmanageri";
import sendMail from "../function/sendMail";
import Sidebar from "../components/zfm/Sidebar";
import TripDetails from "../components/zfm/TripDetails";
import Supported from "../components/home/Supported";
import BookingDetailziro from "../components/common/BookingDetailziro";
import Testimonial from "../components/home/Testimonial";
import Contactform from "../components/zfm/Contactform";
import BookingEnquiry from "../components/common/BookingEnquiry";

const Ziro_camping = ({ data, base_url, faqdata }) => {
  const [checklogin, setChecklogin] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggles, setToggles] = useState(false);
  const [salert, setSalert] = useState({ sucess: "", fail: "" });
  const [paymentdetails, setPaymentdetails] = useState("");
  const [bloading, setBloading] = useState(false);
  const [successpage, setSuccesspage] = useState("");
  const {
    images,
    durationtext,
    name,
    price,
    carbon,
    description,
    addons,
    tripdetailsc,
    youtubeurl,
    simillartrip,
  } = data;

  useEffect(() => {
    Tagmanageri();
  }, []);

  const getAddonsName = (arr) => {
    let namearr = [];
    if (arr && arr.length > 0) {
      arr.map((x) => {
        let checkvcdata = addons.filter((addon) => addon.id === x);
        if (checkvcdata && checkvcdata.length > 0) {
          namearr = [...namearr, checkvcdata[0].name];
        }
      });
    }
    return namearr;
  };

  function getPrice(priceData) {
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    function isWithinEarlyBidding(today, earlyBiddingDates) {
      const todayFormatted = formatDate(today);
      const startDate = new Date(earlyBiddingDates[0]);
      const endDate = new Date(earlyBiddingDates[1]);
      return today >= startDate && today <= endDate;
    }

    const today = new Date();

    if (isWithinEarlyBidding(today, priceData.earlybidding)) {
      return priceData.price;
    } else {
      return priceData.p_price;
    }
  }
  function getmrpPrice(priceData) {
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    function isWithinEarlyBidding(today, earlyBiddingDates) {
      const todayFormatted = formatDate(today);
      const startDate = new Date(earlyBiddingDates[0]);
      const endDate = new Date(earlyBiddingDates[1]);
      return today >= startDate && today <= endDate;
    }

    const today = new Date();

    if (isWithinEarlyBidding(today, priceData.earlybidding)) {
      let mrp = Math.ceil((+priceData.price * 30) / 100 + +priceData.price);
      return mrp;
    } else {
      let mrp = Math.ceil((+priceData.p_price * 30) / 100 + +priceData.p_price);
      return mrp;
    }
  }
  const todayprice = getPrice(data);
  const todaymrpprice = getmrpPrice(data);

  return (
    <>
      <Login setChecklogin={setChecklogin} />
      <Head>
        <title>
          2N-3D Camping at Ziro Festival of Music 2024| Encamp Adventures
        </title>
        <meta
          name="description"
          content="Experience the Ziro Festival of Music with Encamp Adventures. Book a 2N/3D Twin Sharing Dome Tent Stay with Complimentary Breakfast & Campsite Facilities. Explore more with our Village Guided Walks, Ziro Valley Tours and more. Offset your carbon footprint with us."
        />
        <meta
          name="keywords"
          content="Ziro Festival of Music, Camping, Dome Tent Stay, Ziro, Arunachal Pradesh, Encamp Adventures, Music Festival, Outdoor Adventures, Sustainable Tourism, Carbon Offset"
        />
        <meta
          property="og:title"
          content="2N-3D Camping at Ziro Festival of Music 2024 | Encamp Adventures"
        />
        <meta
          property="og:description"
          content="Experience the Ziro Festival of Music with Encamp Adventures. Book a 2N/3D Twin Sharing Dome Tent Stay with Complimentary Breakfast & Campsite Facilities. Explore more with our Village Guided Walks, Ziro Valley Tours and more. Offset your carbon footprint with us."
        />
        <link rel="icon" src="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta
          property="og:image"
          content={`${base_url}/assets/ziro/swiper-image-2.jpg`}
        />
        <meta property="og:url" content={`${base_url}/ziro_camping`} />
        <link rel="canonical" href={`${base_url}/ziro_camping`} />
      </Head>
      <Header theme={"light"} base_url={base_url} />
      {paymentdetails === "" ? (
        <>
          {successpage === "" ? (
            <>
              <Sidebar
                getAddonsName={getAddonsName}
                datax={data}
                initializeRazorpay={initializeRazorpay}
                defaultpeople={2}
                bloading={bloading}
                setBloading={setBloading}
                AOS={AOS}
                base_url={base_url}
                setToggle={setToggle}
                toggle={toggle}
                salert={salert}
                setSalert={setSalert}
                Tagmanageri={Tagmanageri}
                setPaymentdetails={setPaymentdetails}
                checklogin={checklogin}
                todayprice={todayprice}
                durationtext={durationtext}
              />
              <Contactform
                AOS={AOS}
                Tagmanageri={Tagmanageri}
                toggle={toggles}
                setToggle={setToggles}
                successpage={successpage}
                setSuccesspage={setSuccesspage}
                sendMail={sendMail}
              />
              <SliderSection
                AOS={AOS}
                images={images}
                base_url={base_url}
                nameite={name}
                itenaryduration={durationtext}
                totalcf={carbon}
                totalprice={price}
              />
              <TripDetails
                toggles={toggles}
                setToggles={setToggles}
                isgrouptrip={false}
                AOS={AOS}
                base_url={base_url}
                setToggle={setToggle}
                toggle={toggle}
                description={description}
                nameite={name}
                tripdetailsc={tripdetailsc}
                totalpricetag={` ${todayprice}/pax`}
                todaymrppricetag={` ${todaymrpprice}/pax`}
                youtubeurl={`${youtubeurl}`}
                descriptionandoffering={""}
                aboutziro={true}
                durationtext={durationtext}
                simillartrip={simillartrip}
              />
              <Faq faqdata={faqdata} />
              <ScoreArea AOS={AOS} base_url={base_url} totalcf={carbon} />
              <Testimonial AOS={AOS} />
              <Supported AOS={AOS} />
              <LastSection AOS={AOS} base_url={base_url} />
            </>
          ) : (
            <BookingEnquiry
              AOS={AOS}
              base_url={base_url}
              successpage={successpage}
            />
          )}
        </>
      ) : (
        <BookingDetailziro
          AOS={AOS}
          base_url={base_url}
          paymentdetails={paymentdetails}
          sendMail={sendMail}
        />
      )}
      <Footer />
    </>
  );
};
export default Ziro_camping;

export async function getServerSideProps() {
  const base_url = process.env.BASEURL;
  const data = {
    name: "2N-3D Encamp ZFM 2024 Package",
    youtubeurl: "https://www.youtube.com/embed/S_-f0OxyU3U?si=O5SVNIV1jcqai5IM",
    tripdetails:
      "2N/3D Twin Sharing Dome Tent Stay + Complimentary Breakfast + Campsite Facilities",
    duration: { from: "2024-09-28", to: "2024-09-30" },
    durationtext: "2 Nights & 3 Days",
    price: 8500,
    simillartrip: [
      { name: "3N-4D Package", link: "/3N_4D_ziro_camping" },
      { name: "4N-5D  Package", link: "ziro_camping" },
    ],
    p_price: 10500,
    earlybidding: ["2024-05-01", "2024-06-30"],
    carbon: "375 KgCO2 per person",
    sizeoftent: "4 by 7 feet",
    description:
      "While the festival music keeps you grooving, your abode should certainly be a place of utmost comfort. And thats what we are offering you at Encamp Ziro. <br/><br/> Lounge back and catch up with your friends and  tent mates in the bamboo machang under ten million stars , or jam the night away and welcome the dawn by the bonfire OR simply snooze off after a heavy day of blissful experiences and take the morning nature walk . The choice is yours to explore once youre there. But don’t miss our deal, coz its really a steal! We bet youll get any other camping experience as Encamp at the price we are offering.<br/><br/> So wander no more & book today!",
    addons: [
      {
        id: "axc1",
        type: "activity",
        name: "Village Guided Walks",
        date: "25-09-2024",
        price: 600,
      },
      {
        id: "axc2",
        type: "activity",
        name: "Ziro Valley Sightseeing",
        date: "26-09-2024",
        price: 1500,
      },
      {
        id: "axc3",
        type: "activity",
        name: "Fishing in Paddy Field",
        date: "27-09-2024",
        price: 800,
      },
      {
        id: "axc4",
        type: "activity",
        name: "Winery Visit and Tasting",
        date: "28-10-2024",
        price: 2500,
      },
      {
        id: "axc7",
        either: true,
        type: "vehicle",
        name: "Naharlagun Pickup & Drop",
        price: 4000,
        desc: "While the destination is breathtaking, the journey should be thrilling too, right? Well, our side pick-up and drop services ensure you get only the right kind of thrills as you arrive and depart the festival.",
      },
      {
        id: "axc8",
        either: true,
        type: "vehicle",
        name: "Guwahati Pickup & Drop",
        price: 6000,
        desc: "While the destination is breathtaking, the journey should be thrilling too, right? Well, our side pick-up and drop services ensure you get only the right kind of thrills as you arrive and depart the festival.",
      },
      {
        id: "axc9",
        either: true,
        type: "vehicle",
        name: "Holongi Airport Pickup & Drop",
        price: 4500,
        desc: "",
      },
      {
        id: "axc5",
        type: "activity",
        name: "Post ZFM tour 6N7D Tawang",
        date: "28-10-2024",
        price: 45000,
      },
      {
        id: "axc6",
        type: "activity",
        name: "Post ZFM tour 6N7D Anini",
        date: "28-10-2024",
        price: 45000,
      },
    ],
    images: [
      "/assets/ziro/night.jpg",
      "/assets/ziro/dayevent.jpg",
      "/assets/ziro/campsite.jpg",
      "/assets/ziro/chill.jpg",
      "/assets/ziro/ziro_1.jpg",
      "/assets/ziro/ziro_2.jpg",
      "/assets/ziro/ziro_3.jpg",
      "/assets/ziro/ziro_4.jpg",
      "/assets/ziro/ziro_5.jpg",
      "/assets/ziro/ziro_6.jpg",
      "/assets/ziro/ziro_7.jpg",
    ],
  };
  let ds = [];
  let ss = await Datafaq();
  if (ss && ss.length > 0) {
    ds = ss.filter(
      (item) => item.category.toLowerCase().indexOf("zero".toLowerCase()) > -1
    );
  }

  return { props: { data: data, base_url: base_url, faqdata: ds } };
}
