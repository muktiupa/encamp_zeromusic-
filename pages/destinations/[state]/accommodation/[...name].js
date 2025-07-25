import { useRouter } from 'next/router';
import adminapi from "../../../../api/adminapi";
import { useState, useEffect , useContext } from 'react';
import HtmlHead from '../../../../components/common/HtmlHead';
import Header from '../../../../components/common/Header';
import Footer from '../../../../components/common/Footer';
import AOS from "aos";
import SliderSection from "../../../../components/accomodation/SliderSection";
import TripDetails from "../../../../components/accomodation/TripDetails";
import BeautySection from "../../../../components/accomodation/BeautySection";
import Addons from "../../../../components/accomodation/Addons";
import ScoreArea from "../../../../components/accomodation/ScoreArea";
import LastSection from "../../../../components/accomodation/LastSection";
import PrintArea from "../../../../components/accomodation/PrintArea";
import Required from "../../../../components/accomodation/Required";
import { initializeRazorpay } from "../../../../components/razorpay/initializerazorpay";
import Sidebar from "../../../../components/accomodation/Sidebar";
import sendMail from "../../../../function/sendMail";
import Contactform from "../../../../components/accomodation/Contactform";
import CheckAvailability from "../../../../components/accomodation/CheckAvailability";
import { Tagmanageri } from "../../../../components/common/tagmanageri";
import Loading from "../../../../components/common/Loading";
import ReferralNotification from '../../../../components/common/ReferralNotification';
import {CampaignContext} from "../../../../components/common/CampaignContext";

function generateSlug(text = '') {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove special characters except hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Collapse multiple hyphens
    .trim();
}

const Accomodation = ({ data, base_url, clientId }) => {

  const router = useRouter();
  const images = data && data.length > 0 && data[0].images ? data[0].images : null;
  const description = data && data.length > 0 && data[0].description ? data[0].description : null;
  const names = data && data.length > 0 && data[0].name ? data[0].name : null;
  const accomodationtypexc = data && data.length > 0 && data[0].pricing && data[0].pricing.length > 0 && data[0].pricing[0].roomtype ? data[0].pricing[0].roomtype : '';
  const defaultcapacity = data && data.length > 0 && data[0].pricing && data[0].pricing.length > 0 && data[0].pricing[0].capacity ? data[0].pricing[0].capacity : 1;
  const instabooking = data && data.length > 0 && data[0] && data[0].instabooking && data[0].instabooking;
  const [orderbooking, setOrderbooking] = useState({ travelDate: { start: '', end: '', noofdays: '' }, travellers: defaultcapacity, firstName: "", lastName: "", contact: "", email: "", carbonproject: [], bookedItenary: [], advance: "", rooms: '', token: '', addons: [], accommodationtype: accomodationtypexc });
  const [error, setError] = useState({ start: '', end: '', travellers: '', firstName: "", lastName: "", contact: "", email: "", carbonproject: '', bookedItenary: '', advance: '', rooms: '' });
  const [toggle, setToggle] = useState(false);
  const [toggles, setToggles] = useState(false);
  const [togglesx, setTogglesx] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [salert, setSalert] = useState({ sucess: '', fail: '' });
  const [bloading, setBloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alldata, setAlldata] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const { fetchParams, resetParams } = useContext(CampaignContext);


  const getPriceString = () => {
    let total = 0;
    let noofpeople = 0;

    let alltotal = grandTotalcart();

    return ` ${alltotal.total} for ${alltotal.defaultno} Persons.`

  }

  const todate = () => {
    let today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;

  }

  const getLocationDetails = (filter) => {
    let arr = [filter?.district];
    return arr;

  }
  const getActivitylist = (list) => {

    let arr = list.map((lic) => {
      return lic.value;
    })
    return arr;

  }

  const validateEmail = (emails) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (emails.match(validRegex)) {
      return true;
    } else {
      return false;
    }

  }

  const addonPriceCalculation = (arr, noofpeople, noofdays, roomtypeindex) => {
    let totalpriceactivity = 0;
    let totalpriceactivityperperson = 0;
    let totalpriceactivityforall = 0;
    let totalpriceaddon = 0;
    let totalprice = 0;
    let datax;

    let accomodationtype = 0;
    if (roomtypeindex && roomtypeindex !== -1) {
      accomodationtype = roomtypeindex;

    }


    let cvb = [];
    let defaultno = data && data.length > 0 && data[0] && data[0].pricing ? data[0].pricing[accomodationtype].capacity : 0;
    let newnopeople = noofpeople ? noofpeople : defaultno;
    let newdays = noofdays ? noofdays : 1;

    if (data?.[0]?.addons) {
      datax = data[0].addons;
    }

    if (arr && arr.length > 0) {

      totalpriceactivityperperson = datax
        .filter((addon) => arr.includes(addon.id) && addon.tag === 'activity' && addon.unit === 'perperson')
        .reduce((sum, addon) => +sum + +addon.price, 0);


      totalpriceactivityforall = datax
        .filter((addon) => arr.includes(addon.id) && addon.tag === 'activity' && addon.unit !== 'perperson')
        .reduce((sum, addon) => +sum + +addon.price, 0);

      totalpriceactivity = (+totalpriceactivityperperson * +newnopeople) + +totalpriceactivityforall;

      totalpriceaddon = datax
        .filter((addon) => arr.includes(addon.id) && addon.tag === 'addon')
        .reduce((sum, addon) => +sum + +addon.price, 0);
    }

    let totaladdonwithpaxanddays = +totalpriceaddon * +newnopeople * +newdays;

    totalprice = +totalpriceactivity + +totaladdonwithpaxanddays;

    return { addontotal: totalprice, addonactivitytotal: totalpriceactivity, addonaddontotal: totaladdonwithpaxanddays };

  }

  const grandTotalcart = (noofpeople, noofdays, roomre, whichcat, addonobj) => {
    let accomodationtype = 0;
    if (whichcat && whichcat !== -1) {
      accomodationtype = whichcat;

    }

    let addontotal = addonobj && addonobj.addontotal ? addonobj.addontotal : 0;
    let addonactivitytotal = addonobj && addonobj.addonactivitytotal ? addonobj.addonactivitytotal : 0;
    let addonaddontotal = addonobj && addonobj.addonaddontotal ? addonobj.addonaddontotal : 0;



    let stay = data && data.length > 0 && data[0] && data[0].pricing ? data[0].pricing[accomodationtype].price : 0;
    let actualtotal = data && data.length > 0 && data[0] && data[0].pricing ? data[0].pricing[accomodationtype].price : 0;

    let addontot = addontotal ? +addontotal : 0;
    let defaultno = data && data.length > 0 && data[0] && data[0].pricing ? data[0].pricing[accomodationtype].capacity : 0;
    let roomtype = data && data.length > 0 && data[0] && data[0].pricing ? data[0].pricing[accomodationtype].roomtype : null;
    let newnopeople = noofpeople ? noofpeople : defaultno;
    let newdays = noofdays ? noofdays : 1;
    let noofroomrequireda = defaultno === 0 ? 0 : Math.ceil(+newnopeople / +defaultno);
    let noofroomrequired = (roomre > noofroomrequireda) ? roomre : noofroomrequireda;
    let carbonval = Math.ceil(data?.[0]?.carbonval ?? 0 * noofroomrequired * newdays);
    actualtotal = Math.ceil(+actualtotal * +noofroomrequired * +newdays);
    let totalwithoutcf = +actualtotal + +addontot;
    let carboncess = Math.ceil((+totalwithoutcf * 2.5) / 100);
    //let subtotal = +totalwithoutcf + +carboncess;
    let subtotal = +totalwithoutcf;
    let taxat5percent = Math.ceil((subtotal * 5) / 100);
    //let grand= subtotal + taxat5percent;
    //let grand= +totalwithoutcf;
    let grand = 0
    let discountobj = null;
    if (appliedCoupon) {
      grand = +appliedCoupon.finalAmount;
      discountobj = appliedCoupon;
    } else {
      grand = totalwithoutcf;
    }

    return { addonactivitytotal: addonactivitytotal, addonaddontotal: addonaddontotal, newnopeople: newnopeople, defaultno: defaultno, roomtype: roomtype, noofroomrequired: noofroomrequired, carbonval: carbonval, subtotal: subtotal, taxat5percent: taxat5percent, grand: grand, carboncess: carboncess, newdays: newdays, addontotal: addontot, total: actualtotal, actualsubtotal: totalwithoutcf, discountobj: discountobj }

  }
  const gotoPayment = (e) => {
    e.preventDefault();
    let acterror = { ...error };
    let tv = 0;
    if (orderbooking.travellers === "" || orderbooking.travellers < 1) {
      tv = 1;
    } else {
      tv = orderbooking.travellers;
    }
    if (orderbooking.firstName === "") {
      acterror = { ...acterror, firstName: 'FirstName Required' };
    } else {
      acterror = { ...acterror, firstName: '' };
    }
    if (orderbooking.lastName === "") {
      acterror = { ...acterror, lastName: 'LastName Required' };
    } else {
      acterror = { ...acterror, lastName: '' };
    }
    if (orderbooking.contact === "" || orderbooking.contact.length < 10 || orderbooking.contact.length > 13) {
      acterror = { ...acterror, contact: 'Mobile Number Required' };
    } else {
      acterror = { ...acterror, contact: '' };
    }
    if (orderbooking.email === "" || !validateEmail(orderbooking.email)) {
      acterror = { ...acterror, email: 'Email Required' };
    } else {
      acterror = { ...acterror, email: '' };
    }
    if (orderbooking.travelDate.start === "") {
      acterror = { ...acterror, start: 'Start Date Required' };
    } else {
      acterror = { ...acterror, start: '' };
    }
    if (orderbooking.travelDate.end === "") {
      acterror = { ...acterror, end: 'End Date Required' };
    } else {
      acterror = { ...acterror, end: '' };
    }
    if (orderbooking.rooms === "" || orderbooking.rooms !== alldata.noofroomrequired) {
      acterror = { ...acterror, rooms: 'Room necessary' };
    } else {
      acterror = { ...acterror, rooms: '' };
    }
    if (orderbooking.carbonproject.length === 0) {
      acterror = { ...acterror, carbonproject: 'Select atleast a Project' };
    } else {
      acterror = { ...acterror, carbonproject: '' };
    }
    if (isChecked && orderbooking.advance === "") {
      acterror = { ...acterror, advance: 'Advance should be equal or greater than 50% of total value' };
    } else {
      if (orderbooking.advance > grandTotalcart()[3] || orderbooking.advance < (grandTotalcart()[3] * 50) / 100) {
        acterror = { ...acterror, advance: 'Advance should be equal or greater than 50% of total value' };
      } else {
        acterror = { ...acterror, advance: '' };
      }
    }
    if (!isChecked && orderbooking.advance === "") {
      acterror = { ...acterror, advance: '' };
    }

    setError(acterror);
    let setter = false;
    for (let obj in acterror) {
      if (acterror[obj] !== "") {
        setter = true;
        return;
      }
    }

    if (!setter) {
      let settogo = { ...orderbooking, allcalculation: alldata, travellers: tv, clientId };


      makePayment(settogo);

    }

  }



  useEffect(() => {
    let fisa = grandTotalcart();
    if (data && fisa) {
      setAlldata(fisa);
    }
    if (data && orderbooking.bookedItenary.length === 0 && fisa) {

      let asa = { ...orderbooking };
      asa.bookedItenary = {};
      asa.bookedItenary.requirement = fisa;
      asa.bookedItenary.grandtotal = {};
      asa.bookedItenary.grandtotal.gcf = fisa.carbonval;
      asa.bookedItenary.grandtotal.gdays = fisa.newdays;
      asa.bookedItenary.grandtotal.gprice = fisa.grand;
      asa.clientId = clientId;
      setOrderbooking(asa);
    }

  }, [data, toggle, appliedCoupon]);


  useEffect(() => {
    let noofdays = 1;
    if (orderbooking.travelDate.end !== "" && orderbooking.travelDate.start !== "") {
      noofdays = Number(new Date(orderbooking.travelDate.end)) - Number(new Date(orderbooking.travelDate.start));
      noofdays = noofdays < 0 ? 1 : noofdays / (60 * 60 * 24 * 1000);
    }

    let trtotal = "";
    if (noofdays && noofdays > 0) {
      trtotal = { ...orderbooking.travelDate, noofdays: noofdays };
    }

    let roomtypeindex = orderbooking.accommodationtype && data && data.length > 0 && data[0] && data[0].pricing ? data[0].pricing.findIndex((room) => room.roomtype === orderbooking.accommodationtype) : null;

    let addonarr = orderbooking.addons ? orderbooking.addons : null;

    let addonstotal = addonarr ? addonPriceCalculation(addonarr, orderbooking.travellers, noofdays, roomtypeindex) : 0;

    let assdata = grandTotalcart(orderbooking.travellers, noofdays, null, roomtypeindex, addonstotal);
    let numre = assdata.noofroomrequired;
    assdata = grandTotalcart(orderbooking.travellers, noofdays, numre, roomtypeindex, addonstotal);


    let recalculatetotal = {};
    let copyofdataobj = { ...data?.[0] };
    recalculatetotal = { gdays: assdata.newdays, gcf: assdata.carbonval, gprice: assdata.grand, requirement: assdata }

    copyofdataobj = { ...copyofdataobj, grandtotal: recalculatetotal }

    setAlldata({ ...alldata, ...assdata });
    setOrderbooking({ ...orderbooking, bookedItenary: copyofdataobj, travelDate: trtotal, rooms: assdata.noofroomrequired, appliedCoupon: appliedCoupon });

  }, [orderbooking.rooms, orderbooking.travellers, orderbooking.travelDate.start, orderbooking.travelDate.end, orderbooking.accommodationtype, orderbooking.addons, appliedCoupon]);


  const makePayment = async (cartdata) => {
    setBloading(true);
    setLoading(true);
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      setSalert({ ...salert, fail: "Razorpay SDK Failed to load" });
      return;
    }

    const campaignParams = fetchParams();

    const data = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify(orderbooking),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then((t) =>
      t.json()
    );

    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      name: data.name,
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your Payment",
      image: "https://encampadventures.com/images/logo1.png",
      handler: async function (response) {
        if (data.id == await response.razorpay_order_id) {
          let path = `/payment/${response.razorpay_order_id}`;
          let ordertotal = {};
          ordertotal.billingDetails = orderbooking.bookedItenary.grandtotal;
          ordertotal.paymentobj = [{ order_id: response.razorpay_order_id, amount: (data.amount) / 100, payment_url: "https://paidbydirect.com", payment_id: response.razorpay_payment_id, payment_link_id: response.razorpay_payment_id, status: 'success', t_date: todate(), remarks: "Online Transfer via payment gateway", trantype: "Website-Transfer" }];
          ordertotal.addons = orderbooking.addons ? orderbooking.addons : [];
          ordertotal.package = orderbooking.accommodationtype ? orderbooking.accommodationtype : '';
          ordertotal.travellers = orderbooking.travellers ? orderbooking.travellers : '';
          ordertotal.breakup = alldata;
          ordertotal.selectedprojects = orderbooking?.carbonproject ?? null;
          //adminapi.defaults.headers.common={'Authorization': 'Bearer ' + orderbooking.token};
          const localresponse = await adminapi.put(path, JSON.stringify({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            name: data.name,
            amount: data.amount,
            prductdetails: data.prductdetails,
            ordertotal: ordertotal,
            contact: data.phone,
            email: data.email,
            checkindate: data.checkindate,
            status: "success",
            isadvance: data.isadvance,
            tag: data.tag,
            clientId: clientId,
            info:campaignParams ?? null

          }));


          if (localresponse.data !== 400) {
            // Validate payment at serverv - using webhooks is a better idea.
            let ppdetail = {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              name: data.name,
              amount: data.amount,
              prductdetails: data.prductdetails,
              ordertotal: data.ordertotal,
              ordertotalobj: ordertotal,
              contact: data.phone,
              email: data.email,
              checkindate: data.checkindate,
              isadvance: data.isadvance,
              tag: data.tag

            };
            let cccheck = { idfor: "accommodation" }
            document.cookie = `successpage=${encodeURIComponent(JSON.stringify(cccheck))}; path=/; max-age=300`;
            localStorage.setItem('successpage', JSON.stringify(ppdetail));

            let uniqueid = localStorage.getItem('cartid');
            localStorage.removeItem(uniqueid);
            setSalert({ ...salert, success: "Payment transaction has been success", fail: "" });
            Tagmanageri([{ pagename: 'accommodation', order_value: (data.amount) / 100 || 0 }], 'new_booking');
            resetParams();
             const queryParams = new URLSearchParams({
                ...(campaignParams || {}),
                page: "experience", 
              }).toString();

     await router.push(`/success?${queryParams}`);
          } else {
            setSalert({ ...salert, fail: "Payment transaction has been Failed" });
            setBloading(false);
            setLoading(false);
          }
        } else {
          //if payment not verified
          setSalert({ ...salert, fail: "Payment transaction verification pending" });
          setBloading(false);
          setLoading(false);

        }

      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.phone,
      },
      modal: {
        ondismiss: function () {
          // Handle the payment window being closed by the user
          alert("Payment Cancelled");
          setBloading(false);
          setLoading(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  }

  useEffect(() => {
    Tagmanageri();
    setIsClient(true);

  }, []);



  return (
    <>
      <Loading forceloading={loading} />
      <HtmlHead urlx={router.asPath} images={images} metaData={data && data.length > 0 && data[0] && data[0].metaData ? data[0].metaData : null} />
      <Header theme={'light'} base_url={base_url} />
      <ReferralNotification />
      <Sidebar
        bloading={bloading}
        setBloading={setBloading}
        AOS={AOS}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        orderbooking={orderbooking}
        setOrderbooking={setOrderbooking}
        base_url={base_url}
        setToggle={setToggle}
        toggle={toggle}
        gotoPayment={gotoPayment}
        grandTotalcart={grandTotalcart}
        error={error}
        alldata={alldata}
        data={data}
        Tagmanageri={Tagmanageri}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
      />
      <Contactform
        AOS={AOS}
        Tagmanageri={Tagmanageri}
        toggle={toggles}
        setToggle={setToggles}
        sendMail={sendMail}
        name={names}
      />
      <CheckAvailability
        AOS={AOS}
        Tagmanageri={Tagmanageri}
        toggle={togglesx}
        setToggle={setTogglesx}
        sendMail={sendMail}
        name={names}
      />
      {isClient && (
        <>
      <SliderSection AOS={AOS} images={images} base_url={base_url} name={names} totalcf={grandTotalcart().carbonval} totalprice={grandTotalcart().total} />
      <TripDetails AOS={AOS} base_url={base_url} setToggle={setToggle} toggle={toggle} description={description} totalcf={grandTotalcart().carbonval} nameite={data?.[0]?.name} totalpricetag={getPriceString()} locationdetails={getLocationDetails(data?.[0] ?? null)} setToggles={setToggles} toggles={toggles} instabooking={instabooking} togglesx={togglesx} setTogglesx={setTogglesx} />
      <BeautySection AOS={AOS} base_url={base_url} activitydata={getActivitylist(data[0].thingstodo)} images={images} otherdetails={data?.[0]?.otherDetails ?? null} />
      <Addons AOS={AOS} addons={data && data.length > 0 && data[0] && data[0].addons ? data[0].addons : []} name={names} />
      <Required AOS={AOS} base_url={base_url} activitydata={getActivitylist(data[0].thingstodo)} />
      <ScoreArea AOS={AOS} base_url={base_url} totalcf={grandTotalcart().carbonval} />
      <PrintArea AOS={AOS} base_url={base_url} />
      <LastSection AOS={AOS} base_url={base_url} />
        </>
      )
        }
      <Footer />
    </>
  )

}


export default Accomodation;


export async function getServerSideProps(context) {
  const base_url = process.env.BASEURL;
  const { name, clientId } = context.query;

  try {
    const res = await adminapi.get(`/location/${name[1]}`);
    let namecv = res?.data?.[0]?.name ?? null;
    let nameurl = namecv ? generateSlug(namecv) : null;

    // Redirect if slug doesn't match actual location name
    if (name[0] !== nameurl) {
      return {
        redirect: {
          destination: `/locations/${nameurl}/${name[1]}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        data: res.data,
        base_url,
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


