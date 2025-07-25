import { useState, useEffect, memo, useCallback, useContext } from "react";
import { DataSubmittedtoapi } from '../../function/enquiry';
import { useRouter } from 'next/router';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { CampaignContext } from "../common/CampaignContext";



const ContactformEn = (props) => {

  const { ipagename, AOS, toggle, setToggle, nameite, sendMail, Tagmanageri } = props;
  const [error, setError] = useState({ travelSdate: "", travelEdate: "", traveller: "", destination: "", firstName: "", lastName: "", contact: "", email: "" });
  const [submitData, setSubmitData] = useState({ nameite: nameite, travelSdate: "", travelEdate: "", traveller: "", destination: "", firstName: "", lastName: "", contact: "", email: "" });
  const [bloading, setBloading] = useState(false);
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [notification, setNotification] = useState('');
  const [finalsubmit, setFinalsubmit] = useState(false);
  const { fetchParams, resetParams } = useContext(CampaignContext);

  useEffect(() => {
    AOS.init({
      disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);

  const onChangeHandler = (e) => {
    if (e.target.name === 'traveller' && e.target.value > 0) {
      setSubmitData({ ...submitData, [e.target.name]: e.target.value });
    }
    if (e.target.name !== 'traveller') {
      setSubmitData({ ...submitData, [e.target.name]: e.target.value });
    }


  }


  const composeMessage = (data) => {
    let hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : '';
    let message = `${data.firstName} ${data.lastName} , ${data.message}.`;
    message += "<div>" + `Mobile Number: ${data.contact}` + "</div>";
    message += "<div>" + `Email: ${data.email}` + "</div>";
    if (data.travelSdate) {
      message += "<div>" + `Travel Dates: Start Date: ${data.travelSdate} - End Date: ${data.travelEdate}` + "</div>";
    }
    if (data.destination) {
      message += "<div>" + `Destination: ${data.destination}` + "</div>";
    }
    if (data.traveller) {
      message += "<div>" + `Number of Traveller: ${data.traveller}` + "</div>";
    }
    if (data.message) {
      message += "<div>" + `Customer Message: ${data.message}` + "</div>";
    }

    message += "<p>" + `Source: ` + "<a href='" + hostname + "/" + router.asPath + "' target='_new'>" + router.asPath + "</a>" + "</p>";

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
      console.log(submitData);
      submitAll(submitData);
    }

  }, [finalsubmit])

  const submitAll = async (submitData) => {

    let exc = { ...error };

    if (submitData.firstName === "") {
      exc.firstName = "Firstname required";
    } else {
      exc.firstName = "";
    }
    if (submitData.lastName === "") {
      exc.lastName = "Lastname required";
    } else {
      exc.lastName = "";
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
    if (submitData.message === "") {
      exc.message = "Message required";
    } else {
      exc.message = "";
    }

    setError(exc);

    let dfd = Object.values(exc);
    let erc = false;
    dfd.map((as) => {
      if (as === "") {
        erc = true;
        return;
      }
    })

    if (erc === false || !erc) {
      return;
    }
    setBloading(true);


    const message = composeMessage(submitData);
    const campaignParams = fetchParams();

    const uploaddata = {
      name: `${submitData.firstName} ${submitData.lastName}`,
      email: submitData.email,
      phone: submitData.contact,
      message: message, tag: 'Enquiry',
      info: { ...submitData, campaign_params: campaignParams || {} }
    };
    let dataSubmitted = await DataSubmittedtoapi(uploaddata);

    if (dataSubmitted && dataSubmitted.success === true) {
      //setSuccesspage(uploaddata);
      document.cookie = `successpage=${encodeURIComponent(JSON.stringify(uploaddata))}; path=/; max-age=300`;
      let maildata = { subject: 'Enquiry', text: message };
      let mailresponse = await sendMail(maildata);
      if (mailresponse) {
        console.log('Mail has been sent');
      } else {
        console.log('Mail server error');
      }
      Tagmanageri([{ pagename: ipagename, custom_itinerary: false }], 'itinerary_request');
      resetParams();
      setBloading(false);
      setSubmitData({ firstName: "", lastName: "", contact: "", email: "", message: '' });
       const queryParams = new URLSearchParams({
                ...(campaignParams || {}),
                page: "enquiry", 
              }).toString();

     await router.push(`/success?${queryParams}`);
    } else {
      setBloading(false);
    }
    setFinalsubmit(false);

  }


  return (
    <>
      <div className={toggle ? "sidebar__area active" : "sidebar__area"}>
        <div className="sidebar__main__blk">
          <div className="sidebar__title">
            <h4>Enquiry</h4>
            <h6 style={{ fontSize: '1rem', cursor: 'pointer', position: 'absolute', right: '10px', top: '20px' }} onClick={() => { setToggle(false) }}>close</h6>
          </div>
          <div className="sidebar__total__price mb-5">
          </div>
          <form onSubmit={handleSumitForm}>

            <div className="sidebar__form__wrap">
              <span className="sidebar__lebel">Primary Traveller</span>
              <div className="sidebar__form__single">
                <label htmlFor="">First Name</label>
                <input name="firstName" className={error && error.firstName ? "error" : "dff"} id="firstName" type="text" onChange={(e) => onChangeHandler(e)} value={submitData.firstName || ''} />
              </div>
              <div className="sidebar__form__single">
                <label htmlFor="">Last Name</label>
                <input className={error && error.lastName ? "error" : "dff"} type="text" name="lastName" id="lastName" onChange={(e) => onChangeHandler(e)} value={submitData.lastName || ''} />
              </div>
              <div className="sidebar__form__single">
                <label htmlFor="">Contact</label>
                <input type="text" className={error && error.contact ? "error" : "dff"} placeholder="+91" name="contact" id="contact" onChange={(e) => onChangeHandler(e)} value={submitData.contact || ''} />
              </div>
              <div className="sidebar__form__single">
                <label htmlFor="">Email</label>
                <input type="email" className={error && error.email ? "error" : "dff"} placeholder="your@domain.com" name="email" id="email" onChange={(e) => onChangeHandler(e)} value={submitData.email || ''} />
              </div>
              <div className="sidebar__form__single">
                <label htmlFor="">Message</label>
                <textarea style={{ width: '100%', border: "1px solid #C0C0C0", borderRadius: "5px", color: "#B4B4B4", fontSize: "16px", fontWeight: "400", padding: "10px" }} className={error && error.message ? "error" : "dff"} placeholder="Enter your Message" name="message" id="message" onChange={(e) => onChangeHandler(e)} value={submitData.message || ''} />
              </div>
            </div>

            <div className="sidebar__main__btn sidebar2">
              <button style={{ border: 'none', width: '100%' }} className="common__btn" disabled={bloading ? true : false}>{bloading ? <span className="spinner-border" role="status"></span> : 'Send'}</button>
            </div>
          </form>
        </div>
      </div>
      <div className="offcanvas-overlay"></div>
    </>
  )



}
export default memo(ContactformEn);