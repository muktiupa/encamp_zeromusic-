import { useRouter } from 'next/router';
import adminapi from "../../api/adminapi";
import axios from "axios";
import { useState, useEffect, useCallback } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "../../components/common/login";
import SliderSection from "../../components/itenary/SliderSection";
import LastSection from "../../components/itenary/LastSection";
import ScoreArea from "../../components/itenary/ScoreArea";
import InformationArea from "../../components/itenary/InformationArea";
import PrintArea from "../../components/itenary/PrintArea";
import { getCalculates } from "../../components/itenary/calculateitenary";
import { initializeRazorpay } from "../../components/razorpay/initializerazorpay";
import { Tagmanageri } from "../../components/common/tagmanageri";
import Review from "../../components/destinations/Review";
import sendMail from "../../function/sendMail";
import Sidebar from "../../components/itenary/Sidebar";
import TripDetails from "../../components/itenary/TripDetails";
import BeautySection from "../../components/itenary/BeautySection";
import Contactform from "../../components/itenary/Contactform";
import ContactformEn from "../../components/itenary/ContactformEn";
import Supported from "../../components/home/Supported";
import EnquiryComponents from "../../components/common/EnquiryComponents";
import Testimonial from "../../components/home/Testimonial";
import HtmlHead from '../../components/common/HtmlHead';
import Faq from "../../components/faq/Faq";
import ShortEnquiry from '../../components/itenary/ShortEnquiry';
import ReferralNotification from '../../components/common/ReferralNotification';



const Itenary = ({ data, base_url, ItenId, carbonRegisteraccess, clientId }) => {
  const [checklogin, setChecklogin] = useState(false);
  const router = useRouter();
  const { name } = router.query;
  const ipagename = name && name.length > 0 ? name[0] : '';
  const { images, nameite, description, tripdetails } = data?.itineraryindex?.[0] ?? { images: null, nameite: null, description: null, tripdetails: null };
  const [defaultpeople, setDefaultpeople] = useState(2);
  const [toggle, setToggle] = useState(false);
  const [toggles, setToggles] = useState(false);
  const [togglesx, setTogglesx] = useState(false);
  const [salert, setSalert] = useState({ sucess: '', fail: '' });
  const [bloading, setBloading] = useState(false);
  const [allaccomodation, setAllaccomodation] = useState([]);
  const [agencycomission, setAgencycomission] = useState(0);
  const [isgrouptrip, setIsgrouptrip] = useState(null);
  const [virtualObj, setVirtualObj] = useState([]);
  const [selectedGrouptrip, setSelectedGrouptrip] = useState(null);
  const constdata = virtualObj?.itineraryindex?.[0]?.commondetails?.required?.constant ?? null;
  const faqdata = virtualObj?.itineraryindex?.[0]?.commondetails?.faq ?? null;
  const [addonData, setAddonData] = useState([]);
  const [totaladdonprice, setTotaladdonprice] = useState(0);
  const [calculationdataxc, setCalculationdataxc] = useState(null);
  const [priceTag, setPriceTag] = useState('');
  const [allactivity, setAllactivity] = useState([]);
  const [listofprojects, setListofprojects] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isenquried, setIsenquried] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isonceOpen, setIsonceOpen] = useState(0);

  useEffect(() => {
    if (window && !window.RazorpayAffordabilitySuite) {
      const script = document.createElement("script");
      script.src = "https://cdn.razorpay.com/widgets/affordability/affordability.js";
      script.async = true;
      document.head.appendChild(script);
    }

    Tagmanageri();
  }, []);

  useEffect(() => {
    if (data) {
      setVirtualObj(data);
      getLocationDetails(data);
      getactivityfromdata(data);
      let defaultpeopled = data?.itineraryindex?.[0]?.commondetails?.noofperson ?? null;

      let isitgroup = data?.itineraryindex?.[0]?.commondetails?.typeoftrip ?? null;
      if (isitgroup && isitgroup === 'group') {
        setIsgrouptrip(isitgroup);
        defaultpeopled = 1;
      }
      if (defaultpeopled) {
        setDefaultpeople(defaultpeopled);
      }
    }
  }, [data]);

  useEffect(() => {
    let ddsds = calculationdataxc?.[5] ?? null;
    getPriceString(ddsds);
  }, [data, calculationdataxc, totaladdonprice, selectedGrouptrip]);

  const getCarbonCF = useCallback((filter) => {

    let cf = 0;
    if (filter.grandtotal) {
      cf = filter?.grandtotal?.[0]?.gcf;
    }
    let dffd = filter?.itineraryindex?.[0]?.commondetails?.carbondata?.total ?? 0;

    if (!cf) {
      cf = dffd;
    }

    return cf;
  }, [virtualObj]);

  const getCalulationdataapi = async (persons, typeoftrip) => {
    try {
      let pc = persons ?? null;
      let tt = typeoftrip ?? null;
      let sg = selectedGrouptrip;
      let ap = totaladdonprice;
      let vbn = { persons: pc, typeoftrip: tt, selectedGrouptrip: sg, addonprice: ap, appliedCoupon: appliedCoupon };

      let asdv = await adminapi.post(`/getItineraryCalculation/${ItenId}`, JSON.stringify(vbn));

      if (asdv.data) {
        setCalculationdataxc(asdv.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const grandTotalcart = (orderbooking) => {

    let nooffpe = data?.itineraryindex?.[0]?.commondetails?.noofperson ?? null;
    let bookedperson = orderbooking?.travellers ?? nooffpe;
    console.log(bookedperson);
    if (bookedperson) {
      getCalulationdataapi(bookedperson, isgrouptrip);

    }
  }

  const getItenaryduration = useCallback((filter) => {
    let totaldays = 0;
    if (filter.grandtotal) {
      totaldays = filter?.grandtotal[0]?.gdays ?? 0;
    }
    let totalstay = 0;
    filter.tempObj && filter.tempObj.map((stay) => {
      if (stay.accomodationdata.accomodation && stay.accomodationdata.accomodation.length > 0) {
        totalstay = totaldays - 1;
      }

    })

    return `${totaldays} Days & ${totalstay} Nights`
  }, [virtualObj]);

  const getPriceString = (persons) => {

    let noofperson = virtualObj?.itineraryindex?.[0]?.commondetails?.noofperson ?? null;
    let aprice = totaladdonprice;
    let total = calculationdataxc?.[3] ?? null;

    let typeoftt = virtualObj?.itineraryindex?.[0]?.commondetails?.typeoftrip ?? '';

    if (persons) {
      noofperson = persons;
    }
    if (typeoftt && typeoftt === 'group') {
      total = virtualObj?.itineraryindex?.[0]?.commondetails?.grouptrip?.[0]?.groupprice ?? 0;
      noofperson = 1;
    }

    console.log("noofperson", noofperson);
    if (total && noofperson) {
      let vbb = { tag: `${total} for ${noofperson} Persons.`, value: total, noofperson: noofperson, addonprice: aprice };
      setPriceTag(vbb);
    }
  }


  const getLocationDetails = (filter) => {
    let arr = [];
    filter.tempObj && filter.tempObj.map((temp) => {
      let dis = temp?.accomodationdata?.accomodation?.[0]?.district ?? null;
      if (dis && dis !== "") {
        arr = [...arr, dis];
      }

    })
    setAllaccomodation(arr);
  }

  const getactivityfromdata = async (data) => {
    let cvb = data?.tempObj ?? null;
    let allactivity = [];
    cvb && cvb.length > 0 && cvb.map((obj) => {

      allactivity = [...allactivity, obj.activitydata[obj.activitydata.length - 1]];
    });

    if (allactivity.length > 0) {
      let querystring = allactivity.toString();
      let res = await adminapi.get(`/getactivities?id=${querystring}`);
      if (res.data) {
        setAllactivity(res.data);
      }
    }
  }

  const getPriceofAddons = async () => {
    let totalprice = 0;
    if (addonData.length > 0) {
      let astring = addonData.toString();
      let res = await adminapi.get(`/getactivities?id=${astring}`);
      if (res.data && res.data.length > 0) {
        let prpri = res.data
          .map(pr => pr.price)
          .reduce((acc, curr) => {
            if (curr === undefined || curr === '') {
              return acc + 0;
            } else {
              return acc + +curr;
            }
          }, 0);
        setTotaladdonprice(prpri);

      }
    } else {
      setTotaladdonprice(0);
    }
  }

  useEffect(() => {
    getPriceofAddons();
  }, [addonData]);


  // carbon trace intregration functions

  const listOfCarbonProjects = async () => {
    // Check if carbonRegisteraccess is defined and accessible
    let ccclientid = carbonRegisteraccess?.useedata?.token ?? null;

    if (!ccclientid) {
      console.log("Client ID not found");
      return;
    }
    let headers = {
      'Accept-Encoding': 'compress',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${carbonRegisteraccess.useedata.token}`
    }


    try {
      let res = await axios.get(
        `${process.env.NEXT_PUBLIC_CARONTRACEURL}/projects/active`,
        { headers }  // No need for an empty string, just pass the headers
      );

      if (res.data) {
        setListofprojects(res.data);  // Ensure setListofprojects is defined in scope
      }
    } catch (e) {
      console.error("CarbonTrace Active Projects retrieval unsuccessful", e);
      return null;
    }
  }


  const callCarbonSalesRegister = async (data) => {
    let saleregistrydata = { ...data };
    // Check if carbon_footprint is a number or a float and greater than 0
    if (typeof data.carbon_footprint !== 'number' || isNaN(data.carbon_footprint) || data.carbon_footprint <= 0) {
      console.log("No valid Carbontrace found");
      return;
    }

    // Check if carbonRegisteraccess is defined and accessible
    let ccclientid = carbonRegisteraccess?.useedata?._id ?? null;

    if (!ccclientid) {
      console.log("Client ID not found");
      return;
    }

    saleregistrydata['client_id'] = ccclientid;

    let headers = {
      'Accept-Encoding': 'compress',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${carbonRegisteraccess.useedata.token}`
    }

    try {
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_CARONTRACEURL}/salesRegisters`,
        JSON.stringify(saleregistrydata),
        { headers }
      );

      if (res.data) {
        console.log("Carbon footprint generated by this itinerary successfully registered to CarbonTrace Portal");
        return res.data;
      }
    } catch (e) {
      console.error("Carbon footprint generated by this itinerary could not be registered", e);
      return null;
    }
  }


  useEffect(() => {
    if (carbonRegisteraccess && carbonRegisteraccess.useedata) {
      setTimeout(() => {
        listOfCarbonProjects();
      }, 4000);

    }


  }, [carbonRegisteraccess]);


  return (
    <>
      {virtualObj && virtualObj.length !== 0 ?
        <>
          <Login setChecklogin={setChecklogin} />
          <HtmlHead urlx={router.asPath} images={images} metaData={data?.itineraryindex?.[0]?.commondetails?.metaData ?? null} />
          <Header theme={'light'} base_url={base_url} />
          <ReferralNotification />
          {showModal && <ShortEnquiry showModal={showModal} setIsonceOpen={setIsonceOpen} setShowModal={setShowModal} idx={ItenId} setIsenquried={setIsenquried} sendMail={sendMail} />}
          <EnquiryComponents toggle={toggles} setToggle={setToggles} />
          <Sidebar clientId={clientId} listofprojects={listofprojects} callCarbonSalesRegister={callCarbonSalesRegister} ipagename={ipagename} initializeRazorpay={initializeRazorpay} getCalculates={getCalculates} grandTotalcart={grandTotalcart} calculationdataxc={calculationdataxc} defaultpeople={defaultpeople} agencycomission={agencycomission} setAgencycomission={setAgencycomission} data={[virtualObj]} bloading={bloading} setBloading={setBloading} AOS={AOS} base_url={base_url} setToggle={setToggle} toggle={toggle} itenaryduration={getItenaryduration(virtualObj)} salert={salert} setSalert={setSalert} Tagmanageri={Tagmanageri}  locationdetails={allaccomodation} checklogin={checklogin} selectedGrouptrip={selectedGrouptrip} setSelectedGrouptrip={setSelectedGrouptrip} totaladdonprice={totaladdonprice} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} />
          {toggles ? <Contactform ipagename={ipagename} AOS={AOS} Tagmanageri={Tagmanageri} toggle={toggles} setToggle={setToggles} nameite={nameite} sendMail={sendMail} /> : ''}
          {togglesx ? <ContactformEn ipagename={ipagename} AOS={AOS} Tagmanageri={Tagmanageri} toggle={togglesx} setToggle={setTogglesx} nameite={nameite} sendMail={sendMail} /> : ''}
          <SliderSection AOS={AOS} images={images} base_url={base_url} nameite={nameite} itenaryduration={getItenaryduration(virtualObj)} totalcf={getCarbonCF(virtualObj)} totalprice={virtualObj} />
          <TripDetails isonceOpen={isonceOpen} setIsonceOpen={setIsonceOpen} isenquried={isenquried} setIsenquried={setIsenquried} showModal={showModal} setShowModal={setShowModal} isgrouptrip={isgrouptrip} AOS={AOS} base_url={base_url} setToggle={setToggle} toggle={toggle} description={description} totalcf={getCarbonCF(virtualObj)} nameite={nameite} tripdetails={tripdetails} totalpricetag={priceTag} locationdetails={allaccomodation} data={[virtualObj]} setTogglesx={setTogglesx} togglesx={togglesx} setSelectedGrouptrip={setSelectedGrouptrip} itenaryobj={[virtualObj]} setAddonData={setAddonData} addonData={addonData} sendMail={sendMail} toggles={toggles} setToggles={setToggles} />
          {constdata && constdata.length > 0 ? <InformationArea AOS={AOS} constant={constdata} /> : ""}
          {faqdata && <Faq faqdata={faqdata} />}
          <PrintArea AOS={AOS} />
          <ScoreArea AOS={AOS} base_url={base_url} totalcf={getCarbonCF(virtualObj)} />
          <BeautySection AOS={AOS} base_url={base_url} activitydata={allactivity} setToggle={setToggles} locations={virtualObj?.tempObj?.[1]?.location ?? null} />
          <Review AOS={AOS} />
          <Testimonial AOS={AOS} />
          <Supported AOS={AOS} />
          <LastSection AOS={AOS} base_url={base_url} />

          <Footer />
        </> : ''
      }
    </>
  )
}
export default Itenary;

export async function getServerSideProps(context) {
  const base_url = process.env.BASEURL;
  const { name, clientId } = context.query;

  const carbonTraceLogin = async () => {
    let headers = {
      'Accept-Encoding': 'compress',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }

    try {
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_CARONTRACEURL}/login`,
        JSON.stringify({ username: 'admin@encampadventures.com', password: 'Encamp@#2024' }),
        { headers }
      );

      if (res.data) {
        return res.data;
      }
    } catch (e) {
      console.error("CarbonTrace Login Unsuccessful", e);
      return null;
    }
  }

  let carbonRegisteraccess = await carbonTraceLogin();

  try {
    const res = await adminapi.get(`/getmaskitinerary/${name[1]}`);
    let namecv = res && res.data.itineraryindex[0].nameite;
    let idcv = name?.[1] ?? '';

    return {
      props: {
        data: res.data,
        base_url: base_url,
        ItenId: idcv,
        carbonRegisteraccess: carbonRegisteraccess ?? null,
        clientId: clientId ?? null
      },
    };
  } catch (error) {
    console.error('API request error:', error);
    return {
      props: {
        error: 'An error occurred while fetching data.',
      },
    };
  }

}


