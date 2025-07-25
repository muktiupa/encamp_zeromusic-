import { useState, useEffect, memo, useCallback , useContext } from "react";
import Image from 'next/image';
import adminapi from "../../api/adminapi";
import Moment from 'moment';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Coupon from "../common/Coupon";
import { useRouter } from "next/router";
import { CampaignContext } from "../common/CampaignContext";

const Sidebar = (props) => {

  const { listofprojects, callCarbonSalesRegister, ipagename, initializeRazorpay, Tagmanageri, agencycomission, getCalculates, grandTotalcart, defaultpeople, data, bloading, setBloading, base_url, toggle, setToggle, salert, setSalert, selectedGrouptrip, setSelectedGrouptrip, totaladdonprice, calculationdataxc, clientId , appliedCoupon , setAppliedCoupon} = props;
  const [orderbooking, setOrderbooking] = useState({ travelDate: "", travellers: defaultpeople, firstName: "", lastName: "", contact: "", email: "", carbonproject: [], bookedItenary: [], advance: "", isChecked: false, token: "" });
  const [error, setError] = useState({ travelDate: "", travellers: '', firstName: "", lastName: "", contact: "", email: "", carbonproject: '', bookedItenary: '', advance: '' });
  const [totalprice, setTotalprice] = useState([]);
  const [isgrouptrip, setIsgrouptrip] = useState({ isgroup: false, travelDate: "" });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [notification, setNotification] = useState('');
  const [finalsubmit, setFinalsubmit] = useState(false);
  const ispartialx = data?.[0]?.itineraryindex?.[0]?.commondetails?.cost?.isPartialAvailable ?? false;
  const [reseter, setReseter] = useState(false);
  const router = useRouter();
  const { fetchParams, resetParams } = useContext(CampaignContext);


  const { itineraryindex } = orderbooking.bookedItenary ? orderbooking.bookedItenary : [];

  useEffect(() => {
    let dss = { ...orderbooking };
    if (data.length > 0) {
      dss = { ...dss, bookedItenary: data[0] }

      if (data[0].itineraryindex[0].hasOwnProperty('typeoftrip') && data[0].itineraryindex[0].typeoftrip === 'group') {
        let trip = data?.[0]?.itineraryindex?.[0]?.commondetails?.grouptrip?.[0];

        if (selectedGrouptrip && selectedGrouptrip.startdate && selectedGrouptrip.enddate) {

          setIsgrouptrip({ ...isgrouptrip, isgroup: true, travelDate: { from: selectedGrouptrip?.startdate ?? '', to: selectedGrouptrip?.enddate ?? '' } });
        } else {
          setIsgrouptrip({ ...isgrouptrip, isgroup: true, travelDate: { from: trip?.startdate ?? '', to: trip?.enddate ?? '' } });
        }
        dss = { ...dss, travelDate: data?.[0]?.itineraryindex?.[0]?.commondetails?.grouptrip?.[0]?.startdate ?? '' }
      }
      setOrderbooking(dss);
    }
  }, [data, selectedGrouptrip]);

  useEffect(() => {

    const { grandtotal, itineraryindex } = data[0];
    let customprice = grandtotal && grandtotal.length > 0 && grandtotal[0].hasOwnProperty('customprice') ? grandtotal[0].customprice : "";
    if (selectedGrouptrip && selectedGrouptrip.groupprice) {
      customprice = selectedGrouptrip.groupprice;
    }
    let totalacv = 0;
    if (orderbooking.travellers) {
      totalacv = +orderbooking.travellers * +totaladdonprice;
    }



    let typeoftrip = itineraryindex[0].hasOwnProperty('typeoftrip') ? itineraryindex[0].typeoftrip : "";
    let calculation = getCalculates(data[0].tempObj, orderbooking.travellers, agencycomission, typeoftrip, customprice, totalacv);

    let copyofdataobj = { ...data[0] };
    let recalculatetotal = { ...copyofdataobj.grandtotal };

    if (calculation && calculation.length > 0) {
      recalculatetotal = { customprice: customprice, gdays: calculation[0], gcf: calculation[1], gat: calculation[2], gprice: calculation[3], requirement: calculation[4] }
    }


    copyofdataobj = { ...copyofdataobj, grandtotal: recalculatetotal }
    let tofu = { ...orderbooking, bookedItenary: copyofdataobj };
    if (selectedGrouptrip && selectedGrouptrip.startdate) {
      let idgroup = data?.[0]?.itineraryindex?.[0]?.commondetails?.grouptrip ?? null;
      if (idgroup) {
        idgroup.filter((ff, id) => {
          if (ff.startdate === selectedGrouptrip.startdate) {
            tofu = { ...tofu, travelDateg: id }
          }
        });

      }
    }

    setOrderbooking(tofu);
    grandTotalcart(tofu);
  },
    [orderbooking.travellers, selectedGrouptrip, orderbooking.travelDate, totaladdonprice , appliedCoupon]);

  useEffect(() => {
    setTotalprice(calculationdataxc);

  }, [calculationdataxc]);




  useEffect(() => {
    if (finalsubmit === true) {
      gotoPayment(orderbooking);
    }
  }, [finalsubmit]);



  const validateEmail = (emails) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (emails.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }
  const todate = () => {
    let today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }


  const onChangeHandler = (e) => {
    if (e.target.name === 'travelDate') {
      if (Number(new Date(e.target.value)) >= Number(new Date(todate()))) {
        setOrderbooking({ ...orderbooking, travelDate: e.target.value });
      }
    } else if (e.target.name === 'travelDateg') {
      let keds = e.target.value;
      let objgrouptrip = data?.[0]?.itineraryindex?.[0]?.commondetails?.grouptrip.filter((sdd, f) => f === +keds);
      if (objgrouptrip && objgrouptrip.length > 0) {
        setSelectedGrouptrip(objgrouptrip[0]);
        setOrderbooking({ ...orderbooking, travelDate: objgrouptrip?.[0]?.startdate ?? '', travelDateg: e.target.value });
      }


    } else {
      setOrderbooking({ ...orderbooking, [e.target.name]: e.target.value });
    }
  }


  const selectCarbon = (val) => {
    let carbonprojarr = orderbooking.carbonproject;
    if (carbonprojarr.indexOf(val) > -1) {
      carbonprojarr.splice(carbonprojarr.indexOf(val), 1);
    } else {
      carbonprojarr = [...carbonprojarr, val];
    }
    setOrderbooking({ ...orderbooking, carbonproject: carbonprojarr });
  }


  const partial = (e) => {
    if (e.target.checked === true) {
      setOrderbooking({ ...orderbooking, advance: Math.floor((totalprice[3] * 50) / 100), isChecked: true });

    } else {
      setOrderbooking({ ...orderbooking, advance: "", isChecked: false });
    }
  }


  const advcheck = (e) => {
    setOrderbooking({ ...orderbooking, advance: e.target.value })
  }



  const getmaxpeoplearr = (das) => {
    if (data[0].tempObj) {
      let number = data?.[0]?.itineraryindex?.[0]?.commondetails?.noofperson ?? null;
      if (!number) {
        number = Number(data?.[0]?.tempObj?.[0]?.defaultnoofpeople) ?? 2;
      }
      //data[0].itineraryindex[0].commondetails.grouptrip)
      let isgroup = data[0].itineraryindex[0].hasOwnProperty('typeoftrip') ? data[0].itineraryindex[0].typeoftrip : "";
      let maxnumber = 0;
      let x = 1;
      if (isgroup === 'group') {
        maxnumber = number;
        if (das) {
          maxnumber = data[0]?.itineraryindex?.[0]?.commondetails?.grouptrip?.filter((g, k) => k === das)?.[0]?.noofperson ?? 1;
        } else {
          maxnumber = data[0]?.itineraryindex?.[0]?.commondetails?.grouptrip?.[0]?.noofperson ?? 1;
        }
      } else {
        maxnumber = number + 10;
        x = Number(number);
      }


      let arr = [];
      for (x; x < +maxnumber + 1; x++) {
        arr = [...arr, x];
      }


      return arr;
    }
  }


  const handleSumitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        submitEnquiryForm(gReCaptchaToken);
      });
    },
    [executeRecaptcha]);


  const submitEnquiryForm = (gReCaptchaToken) => {
    fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recaptchaToken: gReCaptchaToken,
      }),
    })
      .then((res) => res.json())
      .then((resx) => {
        console.log(resx.status);
        if (resx.status && resx.status === "success") {
          setFinalsubmit(true);
          setNotification(resx.message);

        } else {
          setNotification(resx.message);
          setFinalsubmit(false);
        }
      });
  }
  //id extract for locked itineary boooked or not 

  const removeAlreadyappliedcoupon=()=>{
    let bookeditid = data?.[0] ?? _id;
    let couponcodearr = localStorage.getItem('lockPrice');
    if(couponcodearr){
        let couponcodedata = JSON.parse(couponcodearr); 
      //now check if data[0]._id is in couponcodedata as itineraryId
      let couponcodeobj = couponcodedata.filter((x) => x.itineraryId !== bookeditid);
      if(couponcodeobj){
         return couponcodeobj;
      }
}
}

  const gotoPayment = async (data) => {

    let acterror = { ...error };
    if (data.travellers === "") {
      acterror = { ...acterror, travellers: 'Minimum 2' };
    } else {
      acterror = { ...acterror, travellers: '' };
    }
    if (data.firstName === "") {
      acterror = { ...acterror, firstName: 'FirstName Required' };
    } else {
      acterror = { ...acterror, firstName: '' };
    }
    if (data.lastName === "") {
      acterror = { ...acterror, lastName: 'LastName Required' };
    } else {
      acterror = { ...acterror, lastName: '' };
    }
    if (data.contact === "" || data.contact.length < 10 || data.contact.length > 13) {
      acterror = { ...acterror, contact: 'Mobile Number Required' };
    } else {
      acterror = { ...acterror, contact: '' };
    }
    if (data.email === "" || !validateEmail(data.email)) {
      acterror = { ...acterror, email: 'Email Required' };
    } else {
      acterror = { ...acterror, email: '' };
    }
    if (data.travelDate === "") {
      if (isgrouptrip.isgroup === true) {
        data.travelDate = isgrouptrip.travelDate.from;
      } else {

        acterror = { ...acterror, travelDate: 'Date Required' };
      }

    } else {
      acterror = { ...acterror, travelDate: '' };
    }

    if (data.isChecked && data.advance === "") {
      acterror = { ...acterror, advance: 'Advance should be equal or greater than 50% of total value' };
    } else {
      if (data.advance > calculationdataxc[3] || (data.advance + 1) < (calculationdataxc[3] * 50) / 100) {
        acterror = { ...acterror, advance: 'Advance should be equal or greater than 50% of total value' };
      } else {
        acterror = { ...acterror, advance: '' };
      }
      acterror = { ...acterror, advance: '' };
    }
    if (!data.isChecked && data.advance === "") {
      acterror = { ...acterror, advance: '' };
    }



    setError(acterror);
    let setter = true;
    for (let obj in acterror) {
      if (acterror[obj] !== "") {
        setter = false;
        break;
      }
    }


    if (setter === false || !setter) {
      setFinalsubmit(false);
      return;
    }
    // Update data.bookedItenary.grandtotal[0] with new calculation
    const updatedGrandTotal = {
      ...data.bookedItenary.grandtotal[0],
      gprice: calculationdataxc[3],
    };
    data.bookedItenary.grandtotal[0] = updatedGrandTotal;

    makePayment(data);
    setFinalsubmit(false);
 
  }


  const makePayment = async (cartdata) => {
    setBloading(true);
    cartdata.clientId = clientId;
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      setSalert({ ...salert, fail: "Razorpay SDK Failed to load" });
      return;
    }
    const campaignParams = fetchParams();

    try {
      const dataxz = await fetch("/api/razorpay", {
        method: "POST",
        body: JSON.stringify(cartdata),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }).then((t) =>
        t.json()
      );

      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        name: 'Encamp Adventures Pvt. Ltd.',
        currency: dataxz.currency,
        amount: dataxz.amount,
        order_id: dataxz.id,
        description: "Thankyou for your Payment",
        image: "https://encampadventures.com/images/logo1.png",
        handler: async function (response) {
          if (dataxz.id == await response.razorpay_order_id) {
            let path = `/payment/${response.razorpay_order_id}`;
            let ordertotal = {};
            ordertotal.billingDetails = cartdata.bookedItenary.grandtotal;
            ordertotal.paymentobj = [{ order_id: response.razorpay_order_id, amount: (dataxz.amount) / 100, payment_url: "https://paidbydirect.com", payment_id: response.razorpay_payment_id, payment_link_id: response.razorpay_payment_id, status: 'success', t_date: todate(), remarks: "Online Transfer via payment gateway", trantype: "Website-Transfer" }];
            ordertotal.travellers = cartdata.travellers;
            ordertotal.subtotal = totalprice[8].subtotal;
            ordertotal.cf = totalprice[8].cfcharge;
            ordertotal.gst = totalprice[8].tax;
            ordertotal.breakup = totalprice[6];
            ordertotal.selectedprojects = cartdata?.carbonproject ?? null;
           // adminapi.defaults.headers.common = { 'Authorization': 'Bearer ' + websitetoken };
            const localresponse = await adminapi.put(path, JSON.stringify({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              name: dataxz.name,
              amount: dataxz.amount,
              prductdetails: dataxz.prductdetails,
              ordertotal: ordertotal,
              contact: dataxz.phone,
              email: dataxz.email,
              checkindate: dataxz.checkindate,
              status: "success",
              isadvance: dataxz.isadvance,
              clientId: clientId,
              tag: 'itinerary',
              info:campaignParams ?? null


            }));


            if (localresponse.data !== 400) {

              let cregisterData = {
                sale_date: todate(),
                project_ids: cartdata?.carbonproject ?? null,
                carbon_footprint: cartdata?.bookedItenary?.grandtotal?.[0]?.gcf ?? null,
                sale_order_id: response.razorpay_order_id
              }

              let ccres = await callCarbonSalesRegister(cregisterData);
              let ppdetail = {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
                name: dataxz.name,
                amount: dataxz.amount,
                prductdetails: dataxz.prductdetails,
                ordertotal: dataxz.ordertotal,
                contact: dataxz.phone,
                email: dataxz.email,
                checkindate: dataxz.checkindate,
                isadvance: dataxz.isadvance,
                ordertotalobj: ordertotal,
                carbonadjustmentdetails: ccres ?? null,
                iten : data?.[0]?._id ?? null,
              }
              let cccheck = {idfor : "itinerary"}

              // Validate payment at serverv - using webhooks is a better idea.
              //setPaymentdetails(ppdetail);
              console.log(ppdetail);
              document.cookie = `successpage=${encodeURIComponent(JSON.stringify(cccheck))}; path=/; max-age=300`;
              localStorage.setItem('successpage', JSON.stringify(ppdetail));
              let uniqueid = localStorage.getItem('cartid');
              localStorage.removeItem(uniqueid);
              setSalert({ ...salert, success: "Payment transaction has been success", fail: "" });
              Tagmanageri([{ pagename: ipagename, order_value: orderbooking.bookedItenary.grandtotal.gprice || 0 }], 'new_booking');
              resetParams();
              let couponcodeobj = removeAlreadyappliedcoupon();
              if(couponcodeobj){
                localStorage.setItem('lockPrice', JSON.stringify(couponcodeobj));
              }
              const queryParams = new URLSearchParams({
                ...(campaignParams || {}),
                page: "experience", // or "enquiry"
              }).toString();

              await router.push(`/success?${queryParams}`);
              //await router.push(`/success?page=experience`); 
            } else {
              setSalert({ ...salert, fail: "Payment transaction has been Failed" });
              setBloading(false);
            }
          } else {
            //if payment not verified
            setSalert({ ...salert, fail: "Payment transaction verification pending" });
            setBloading(false);


          }

        },
        prefill: {
          name: dataxz.name,
          email: dataxz.email,
          contact: dataxz.phone,
        },
        modal: {
          ondismiss: function () {
            // Handle the payment window being closed by the user
            alert("Payment Cancelled");
            setBloading(false);
          }
        }
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (e) {
      console.log(e);
      setBloading(false);
    }
  }

  

  return (
    <>

      {bloading ? <div className="loader">Loading...</div> : ""}
      <div className={toggle ? "sidebar__area active" : "sidebar__area"}>
        <div className="sidebar__main__blk">
          <div className="sidebar__title">
            <h4>Checkout</h4>
            <h6 style={{ fontSize: '1rem', cursor: 'pointer', position: 'absolute', right: '10px', top: '4rem' }} onClick={() => { setToggle(false) }}>close</h6>
          </div>
          <div className="sidebar__total__price mb-3">
            <h4>Total: ₹  {totalprice?.[3] ?? ''} /-
              {totalprice?.[6]?.coupondata && <><br/><small style={{fontSize:'0.7rem'}}>{`(Actual Subtotal: ${totalprice?.[6]?.coupondata?.actualAmount ?? 0}/-, Discount(less): ${totalprice?.[6]?.coupondata?.discountAmount ?? 0}/-, C.F. charges @2.5%: ${totalprice?.[8]?.cfcharge ?? 0}/- & GST @ 18 %: ${totalprice?.[8]?.tax ?? 0}`}/- ----- Total : {totalprice?.[3] ?? 0} /-</small></>}
              {!totalprice?.[6]?.coupondata && <><br/><small style={{fontSize:'0.7rem'}}>{`(Actual Subtotal: ${totalprice?.[8]?.subtotal ?? 0}/-, C.F. charges @2.5%: ${totalprice?.[8]?.cfcharge ?? 0}/- & GST @ 18 %: ${totalprice?.[8]?.tax ?? 0}`}/- ----- Total : {totalprice?.[3] ?? 0} /-</small></>}
            </h4>
          </div>
          <form onSubmit={handleSumitForm}>
            <div className="sidebar__time">
              {/*<h4>{locationdetails && locationdetails.length > 0 ? `${locationdetails[0]} , ${locationdetails[1]} and ${locationdetails.length - 2 > 0 ? locationdetails.length - 2 : ''} More` : ''}</h4>*/}
              <h4>{itineraryindex && itineraryindex.length > 0 ? itineraryindex[0].nameite : ""}</h4>
              {isgrouptrip.isgroup && data.length > 0 ? <div className="mt-3 mb -3"><span><i className="fa fa-calendar"></i></span>{Moment(isgrouptrip.travelDate.from).format('DD-MMM-YY')} - {Moment(isgrouptrip.travelDate.to).format('DD-MMM-YY')}</div> : ""}
            </div>

            <div className="sidebar__select__wrap">
              {!isgrouptrip.isgroup ?
                <div className="sidebar__select__single">
                  <label htmlFor="">Travel Date</label>
                  <input className={error && error.travelDate ? "form-select error" : "form-select"} type="date" id="travelDate" name="travelDate" min={todate()} onChange={(e) => onChangeHandler(e)} value={orderbooking.travelDate} placeholder="dd-mm-yyyy" />

                </div> : ""}
              {isgrouptrip.isgroup ?
                <div className="sidebar__select__single">
                  <label htmlFor="">Select Date</label>
                  <select className={error && error.travellers ? "form-select error" : "form-select"} type="date" id="travelDateg" name="travelDateg" onChange={(e) => onChangeHandler(e)} value={orderbooking.travelDateg || 0}>
                    {data?.[0]?.itineraryindex?.[0]?.commondetails?.grouptrip?.map((asxs, keyss) => (
                      <option key={keyss} value={keyss}>
                        {asxs.startdate}
                      </option>
                    ))}
                  </select>

                </div> : ""}

              <div className="sidebar__select__single">
                <label htmlFor="">No. of Travellers <small style={{ fontSize: '0.6rem', color: 'red' }}>{error && error.travellers}</small></label>
                <select className={error && error.travellers ? "form-select error" : "form-select"} type="number" id="travellers" name="travellers" onChange={(e) => onChangeHandler(e)} value={orderbooking.travellers || 2}>
                  {getmaxpeoplearr(orderbooking?.travelDateg) && getmaxpeoplearr(orderbooking?.travelDateg).map((asx, key) => {
                    return (<option key={key} value={asx}>{asx}</option>)
                  })}
                </select>
              </div>
            </div>

            <div className="sidebar__form__wrap">
              <span className="sidebar__lebel">Primary Traveller</span>
              <div className="sidebar__form__single">
                <label htmlFor="">First Name</label>
                <input name="firstName" className={error && error.firstName ? "error" : "dff"} id="firstName" type="text" onChange={(e) => onChangeHandler(e)} value={orderbooking.firstName} />
              </div>
              <div className="sidebar__form__single">
                <label htmlFor="">Last Name</label>
                <input className={error && error.lastName ? "error" : "dff"} type="text" name="lastName" id="lastName" onChange={(e) => onChangeHandler(e)} value={orderbooking.lastName} />
              </div>
              <div className="sidebar__form__single">
                <label htmlFor="">Contact</label>
                <input type="text" className={error && error.contact ? "error" : "dff"} placeholder="xxxxx-xxxxx" name="contact" id="contact" onChange={(e) => onChangeHandler(e)} value={orderbooking.contact} />
              </div>
              <div className="sidebar__form__single">
                <label htmlFor="">Email</label>
                <input type="email" className={error && error.email ? "error" : "dff"} placeholder="your@domain.com" name="email" id="email" onChange={(e) => onChangeHandler(e)} value={orderbooking.email} />
              </div>
            </div>

            <span style={{ color: 'red', marginBottom: '10px', width: '100%', paddingLeft: '10px' }}>{error && error.carbonproject ? "Select Atleast a project before submit !!!" : ""}</span>
            <div className="sidebar__carbon__wrap carbon__wrap2" style={{ backgroundImage: `url('${base_url}/assets/img/carbon_bg.jpg')` }}>
              <div className="sidebar2__carbon__title">

                <p>Choose the project you’d like to contribute to.</p>
              </div>
              {listofprojects && listofprojects.length > 0 ? (
                listofprojects.map((project, key) => {
                  return (
                    <div
                      key={project.projectId}  // Added key to avoid React warning
                      id={project.projectId}
                      style={(orderbooking.carbonproject.indexOf(project.projectId) > -1)
                        ? { backgroundColor: '#34cc9c', cursor: 'pointer' }
                        : { backgroundColor: '#1F272C', cursor: 'pointer' }}
                      onClick={() => selectCarbon(project.projectId)}
                      className="sidebar2__carbon__single__wrap position-relative"
                    >
                      <div className="sidebar2__carbon__img">
                        <Image src={`/assets/img/ca1.jpg`} alt="ca1.jpg" object-fit='contain' layout='fill' />
                      </div>
                      <div className="sidebar2__carbon__info">
                        <h4>{`${project.name} (${project.projectTypeName})`}</h4>
                        <p style={(orderbooking.carbonproject.indexOf(project.projectId) > -1) ? { color: 'black' } : { color: 'gray' }}>
                          You are generating {totalprice?.[1] ?? 0} KGs
                        </p>
                        <a className="stretched-link"></a>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p>No projects available.</p>  // Fallback message if listofprojects is empty or undefined
              )}
            </div>
            <Coupon appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} payableamount={totalprice?.[3] ?? 0} applicableCategory={['itinerary']} reseter={reseter} setReseter={setReseter} idx={data?.[0]?._id ?? null}/>
            {ispartialx && (
              <>
                <div className="sidebar__form__single" style={{ width: '100%' }}>
                  <input style={{ width: '15px', height: 'auto', position: 'absolute', marginTop: '15px' }} type="checkbox" name="ispartial" onClick={(e) => partial(e)} />
                  <label style={{ marginLeft: '30px', marginTop: '10px' }} htmlFor="">Pay 50% to book your slot ?</label>

                </div>

                {orderbooking.isChecked ? <div style={{ width: '100%' }} className="sidebar__form__single">
                  <input className={error && error.advance ? "error" : "dff"} type="text" name="advance" placeholder="Enter amount 50% of invoice value or higher" style={{ padding: "8px 3px", width: "100%" }} value={orderbooking.advance} onChange={(e) => advcheck(e)} />
                </div> : ""}
              </>)}
            {Object.values(error).filter(err => err !== '').length > 0 && (
              <div className="light-red-div">
                <ul>
                  {Object.values(error).filter(err => err !== '').map((err, e) => (
                    <li key={e}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="sidebar__main__btn sidebar2">
              <button style={{ border: 'none', width: '100%' }} className="common__btn" disabled={bloading ? true : false}>{bloading ? <span className="spinner-border" role="status"></span> : 'Pay Now'}</button>
            </div>
          </form>
        </div>

      </div>

      <div className="offcanvas-overlay"></div>
    </>
  )

}
export default memo(Sidebar);