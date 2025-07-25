import { useState, useEffect, useCallback, useContext } from "react";
import { stateoptions } from '../../function/statedatacenter';
import { DataSubmittedtoapi } from '../../function/enquiry';
import Image from "next/image";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { CampaignContext } from "../common/CampaignContext";
import { useRouter } from 'next/router';

const FormSection = (props) => {

  const { AOS, sendMail, Tagmanageri } = props;
  const [error, setError] = useState({ destination: "", name: "", contact: "", email: "" });
  const [submitData, setSubmitData] = useState({ destination: "", name: "", contact: "", email: "" });
  const [bloading, setBloading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [notification, setNotification] = useState('');
  const [finalsubmit, setFinalsubmit] = useState(false);
  const { fetchParams, resetParams } = useContext(CampaignContext);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);

  const onChangeHandler = (e) => {

    setSubmitData({ ...submitData, [e.target.name]: e.target.value })


  }

  const composeMessage = (data) => {
    let message = `${data.name} want to explore ${data.destination}.`;
    message += "\r\n" + `Name: ${data.name}`;
    message += "\r\n" + `Contact: ${data.contact}`;
    message += "\r\n" + `Email: ${data.email}`;
    message += "\r\n" + `Travel Details`;
    message += "\r\n" + `Destination: ${data.destination}`;

    return message;
  }


  const ValidateEmail = (input) => {
    let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (input.match(validRegex)) {

      return true;

    } else {

      return false;

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
    [executeRecaptcha]
  );
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
        }
      });

  }

  useEffect(() => {
    if (finalsubmit === true) {
      submitAll(submitData);
    }
    return () => setFinalsubmit(false);

  }, [finalsubmit]);


  const submitAll = async (submitData) => {

    let exc = { ...error };

    if (submitData.destination === "") {
      exc.destination = "Destination required";
    } else {
      exc.destination = "";
    }
    if (submitData.name === "") {
      exc.name = "Name required";
    } else {
      exc.name = "";
    }

    if (submitData.contact === "" || submitData.contact.length > 10) {
      exc.contact = "Mobile required";
    } else {
      exc.contact = "";
    }
    if (submitData.email === "" || !ValidateEmail(submitData.email)) {
      exc.email = "Email required";
    } else {
      exc.email = "";
    }

    setError(exc);

    let dfd = Object.values(exc);
    let erc = dfd.some((sd) => sd !== '');


    if (erc) {
      return;
    }

    setBloading(true);
    let firstname = submitData.name.includes(" ") ? submitData.name.split(" ")[0] : submitData.name;
    let lastname = submitData.name.includes(" ") ? submitData.name.split(" ")[1] : submitData.name;

    const message = composeMessage(submitData);
    const campaignParams = fetchParams();

    const uploaddata = {
      name: `${firstname} ${lastname}`,
      email: submitData.email,
      phone: submitData.contact,
      message: message, tag: 'destination-enquiry',
      info: { ...submitData, campaign_params: campaignParams || {} }
    };

    let dataSubmitted = await DataSubmittedtoapi(uploaddata);

    if (dataSubmitted && dataSubmitted.success === true) {
      document.cookie = `successpage=${encodeURIComponent(JSON.stringify(uploaddata))}; path=/; max-age=300`;


      let maildata = { subject: 'Enquiry for Customize Itenary', text: message };
      let mailresponse = sendMail(maildata);
      if (mailresponse) {
        console.log('Mail has been sent');
      } else {
        console.log('Mail server error');
      }
      Tagmanageri([{ pagename: 'destination' }], 'destination_request');
      resetParams();

      setBloading(false);
      setSubmitData({ nameite: '', travelSdate: "", travelEdate: "", traveller: "", destination: "", firstName: "", lastName: "", contact: "", email: "" });
       const queryParams = new URLSearchParams({
                ...(campaignParams || {}),
                page: "enquiry", 
              }).toString();

     await router.push(`/success?${queryParams}`);
    } else {
      setSuccesspage('');
      setBloading(false);
    }
    setFinalsubmit(false);

  }



  return (
    <section className="hero__area">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-6">
            <div className="hero__content">
              <h3>The beauty of Northeast awaits you!</h3>
              <p>The seven sisters of North East India are blessed with scenic natural beauty, salubrious weather, rich biodiversity, rare wild life, historical sites, distinct cultural and ethnic heritage and warm and welcoming people. <br /> <br /> The region offers unforgettable visits for tourists interested in treking, adventures tourism, wild life, cultural and ethnic tourism, river cruises, and a host of others activities.</p>

              <div className="hero__like__content">
                <p><span><Image src="/assets/img/like.png" alt="like" height='50' width='50' /></span> Fill the form and our team will fill you in with excitement and enthusiasm for North East.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="destination__area">
              <form onSubmit={handleSumitForm}>
                <div className="single__input__box">
                  <label htmlFor="#">Name</label>
                  <input name="name" className={error && error.name ? "error" : "dff"} id="name" type="text" onChange={(e) => onChangeHandler(e)} value={submitData.name || ''} />
                </div>
                <div className="single__input__box">
                  <label htmlFor="#">Mobile</label>
                  <input type="text" className={error && error.contact ? "error" : "dff"} placeholder="+91" name="contact" id="contact" onChange={(e) => onChangeHandler(e)} value={submitData.contact || ''} />
                </div>
                <div className="single__input__box">
                  <label htmlFor="#">Email</label>
                  <input type="email" className={error && error.email ? "error" : "dff"} placeholder="your@domain.com" name="email" id="email" onChange={(e) => onChangeHandler(e)} value={submitData.email || ''} />
                </div>
                <div className="single__input__box">
                  <label htmlFor="#">Destination</label>
                  <select name="destination" className={error && error.destination ? "form-select error" : "form-select"} onChange={(e) => onChangeHandler(e)} value={submitData.destination || ''}>
                    <option value="">Select State</option>
                    {
                      stateoptions.map((state, key) => {
                        return <option key={"sss" + key} value={state.label}>{state.label}</option>
                      })
                    }
                  </select>
                </div>
                <div className="destination__btn">
                  <button style={{ border: 'none', width: '100%' }} className="common__btn" disabled={bloading ? true : false}>{bloading ? <span className="spinner-border" role="status"></span> : 'I’m ready for my trip!'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}
export default FormSection;

