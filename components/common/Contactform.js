import { useState, useEffect , useContext  } from "react";
import { stateoptions } from "../../function/statedatacenter";
import { DataSubmittedtoapi } from "../../function/enquiry";
import { useRouter } from "next/router";
import {CampaignContext} from "../common/CampaignContext";

const Contactform = ({ AOS, toggle, setToggle, sendMail, Tagmanageri }) => {
  const [error, setError] = useState({});
  const { fetchParams, resetParams } = useContext(CampaignContext);
  const [submitData, setSubmitData] = useState({
    nameite: '',
    travelSdate: "",
    travelEdate: "",
    traveller: "",
    destination: "",
    firstName: "",
    lastName: "",
    contact: "",
    email: ""
  });
  const [bloading, setBloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init({ disable: 'mobile' });
    AOS.refresh();
  }, [AOS]);

  const todate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSubmitData(prev => ({ ...prev, [name]: name === "traveller" ? Number(value) : value }));
  };

  const onChangeHandlerDate = (e) => {
    const { name, value } = e.target;
    const selectedDate = new Date(value).getTime();
    const today = new Date().getTime();
    if (selectedDate >= today) {
      setSubmitData(prev => ({ ...prev, [name]: value }));
    }
  };

  const composeMessage = (data) => {
    return `
      ${data.firstName} ${data.lastName} want to explore ${data.nameite}.
      <div>Mobile Number: ${data.contact}</div>
      <div>Email: ${data.email}</div>
      <div>Travel Dates: Start Date: ${data.travelSdate} - End Date: ${data.travelEdate}</div>
      <div>Destination: ${data.destination}</div>
      <div>Number of Traveller: ${data.traveller}</div>
      <p>Source: ${router.pathname}</p>
    `;
  };

  const validateEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const submitAll = async (data) => {
    const errs = {};

    if (!data.travelSdate) errs.travelSdate = "Travel Start date required";
    else if (new Date(data.travelSdate) < new Date()) errs.travelSdate = "Travel Start date must be today or later";

    if (!data.travelEdate) errs.travelEdate = "Travel End date required";
    else if (new Date(data.travelEdate) < new Date(data.travelSdate)) errs.travelEdate = "End date must be after start date";

    if (!data.traveller || data.traveller < 1) errs.traveller = "At least 1 traveller required";
    if (!data.destination) errs.destination = "Destination required";
    if (!data.firstName) errs.firstName = "First name required";
    if (!data.lastName) errs.lastName = "Last name required";
    if (!data.contact || data.contact.length !== 10) errs.contact = "Valid 10-digit mobile number required";
    if (!data.email || !validateEmail(data.email)) errs.email = "Valid email required";

    setError(errs);

    if (Object.keys(errs).length > 0) return;

    setBloading(true);
    const message = composeMessage(data);
  //add new field campain_params in info and pass 
    const campaignParams = fetchParams();
    const uploaddata = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.contact,
      message,
      tag: 'customize-itinerary',
      info: {...data,campaign_params: campaignParams || {}}
    };

    const dataSubmitted = await DataSubmittedtoapi(uploaddata);
    if (dataSubmitted?.success) {
      //localStorage.setItem("successpage", JSON.stringify(uploaddata));
      document.cookie = `successpage=${encodeURIComponent(JSON.stringify(uploaddata))}; path=/; max-age=300`;
      await sendMail({ subject: 'Enquiry for Customize itinerary', text: message });
      Tagmanageri([{ email: uploaddata.email, name: uploaddata.name, phone: uploaddata.phone, page: 'destination' }], 'new_enquiry');
      resetParams();
      setSubmitData({
        nameite: '',
        travelSdate: "",
        travelEdate: "",
        traveller: "",
        destination: "",
        firstName: "",
        lastName: "",
        contact: "",
        email: ""
      });
      const queryParams = new URLSearchParams({
                ...(campaignParams || {}),
                page: "enquiry", 
              }).toString();

     await router.push(`/success?${queryParams}`);
    } else {
      console.log("Submission failed", dataSubmitted);
    }
    setBloading(false);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    submitAll(submitData);
  };

  return (
    <>
      <div className={toggle ? "sidebar__area active" : "sidebar__area"}>
        <div className="sidebar__main__blk">
          <div className="sidebar__title">
            <h4>Get Custom itinerary</h4>
            <h6 style={{ fontSize: '1rem', cursor: 'pointer', position: 'absolute', right: '10px', top: '20px' }} onClick={() => setToggle(false)}>close</h6>
          </div>
          <div className="sidebar__total__price mb-3">
            <h4>Customization Fee: <span style={{ color: 'green' }}>₹ 149/-</span></h4>
          </div>
          <form onSubmit={handleSubmitForm}>
            <div className="sidebar__select__wrap">
              <div className="sidebar__select__single">
                <label>Travel Start Date</label>
                <input type="date" name="travelSdate" className={error.travelSdate ? "form-select error" : "form-select"} min={todate()} onChange={onChangeHandlerDate} value={submitData.travelSdate} />
              </div>
              <div className="sidebar__select__single">
                <label>Travel End Date</label>
                <input type="date" name="travelEdate" className={error.travelEdate ? "form-select error" : "form-select"} min={todate()} onChange={onChangeHandlerDate} value={submitData.travelEdate} />
              </div>
            </div>
            <div className="sidebar__select__wrap">
              <div className="sidebar__select__single">
                <label>No. of Travellers <small>{error.traveller}</small></label>
                <input type="number" name="traveller" className={error.traveller ? "form-select error" : "form-select"} onChange={onChangeHandler} value={submitData.traveller} />
              </div>
              <div className="sidebar__select__single">
                <label>Destinations <small>{error.destination}</small></label>
                <select name="destination" className={error.destination ? "form-select error" : "form-select"} onChange={onChangeHandler} value={submitData.destination}>
                  <option value="">Select State</option>
                  {stateoptions.map((state, i) => <option key={i} value={state.label}>{state.label}</option>)}
                </select>
              </div>
            </div>
            <div className="sidebar__form__wrap">
              <span className="sidebar__lebel">Primary Traveller</span>
              <div className="sidebar__form__single">
                <label>First Name</label>
                <input name="firstName" type="text" className={error.firstName ? "error" : "dff"} onChange={onChangeHandler} value={submitData.firstName} />
              </div>
              <div className="sidebar__form__single">
                <label>Last Name</label>
                <input name="lastName" type="text" className={error.lastName ? "error" : "dff"} onChange={onChangeHandler} value={submitData.lastName} />
              </div>
              <div className="sidebar__form__single">
                <label>Contact</label>
                <input name="contact" type="text" className={error.contact ? "error" : "dff"} onChange={onChangeHandler} value={submitData.contact} />
              </div>
              <div className="sidebar__form__single">
                <label>Email</label>
                <input name="email" type="email" className={error.email ? "error" : "dff"} onChange={onChangeHandler} value={submitData.email} />
              </div>
            </div>
            <div className="sidebar__main__btn sidebar2">
              <button type="submit" className="common__btn" style={{ border: 'none', width: '100%' }} disabled={bloading}>
                {bloading ? <span className="spinner-border" role="status"></span> : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="offcanvas-overlay"></div>
    </>
  );
};

export default Contactform;
