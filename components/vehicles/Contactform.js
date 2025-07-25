import { useState, useEffect, memo, useCallback, useContext } from "react";
import { DataSubmittedtoapi } from '../../function/enquiry';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { CampaignContext } from "../common/CampaignContext";

const Contactform = ({ toggle, setToggle, sendMail, Tagmanageri, enquiry, setEnquiry }) => {

  const [error, setError] = useState({});
  const [submitData, setSubmitData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    message: "",
    travelSdate: "",
    travelEdate: "",
    traveller: "",
    destination: ""
  });


  const [loading, setLoading] = useState(false);
  const [finalSubmit, setFinalSubmit] = useState(false);
  const [notification, setNotification] = useState({ type: "", text: "" });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { fetchParams, resetParams } = useContext(CampaignContext);

  const mobileRegex = /^[6-9]\d{9}$/;
  const msgRegex = /^.{10,}$/;
  const validateEmail = (input) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'traveller' && Number(value) <= 0) return;
    setSubmitData(prev => ({ ...prev, [name]: value }));
  };


  const composeMessage = (data) => {
    let msg = `${data.message || 'Vehicle Enquiry'}<br/><br/>`;
    msg += `<div>Name: ${data.firstName} ${data.lastName}</div>`;
    msg += `<div>Mobile: ${data.contact}</div>`;
    msg += `<div>Email: ${data.email}</div>`;
    if (data.travelSdate || data.travelEdate) {
      msg += `<div>Travel Dates: Start - ${data.travelSdate}, End - ${data.travelEdate}</div>`;
    }
    if (data.destination) msg += `<div>Destination: ${data.destination}</div>`;
    if (data.traveller) msg += `<div>No. of Travellers: ${data.traveller}</div>`;

    // Extra message fields if present
    const extraFields = ['vehicletype', 'vehicleCategory', 'driveType', 'state', 'pickupLocation'];
    extraFields.forEach(field => {
      if (enquiry?.[field]) {
        const label = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        msg += `<div>${label}: ${enquiry[field]}</div>`;
      }
    });

    return msg;
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!executeRecaptcha) return console.warn("Recaptcha not ready");
    executeRecaptcha("enquiryFormSubmit").then(submitEnquiryForm);
  }, [executeRecaptcha, submitData]);

  const submitEnquiryForm = async (token) => {
    const res = await fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recaptchaToken: token })
    });
    const result = await res.json();
    if (result.status === "success") {
      setFinalSubmit(true);
    } else {
      setNotification({ type: "error", text: result.message });
    }
  };

  useEffect(() => {
    if (finalSubmit) {
      submitAll();
    }
    return () => setFinalSubmit(false);
  }, [finalSubmit]);

  const submitAll = async () => {
    const errors = {};
    if (!submitData.firstName.trim()) errors.firstName = "First name is required";
    if (!submitData.lastName.trim()) errors.lastName = "Last name is required";
    if (!mobileRegex.test(submitData.contact)) errors.contact = "Invalid mobile number";
    if (!validateEmail(submitData.email)) errors.email = "Invalid email";
    if (!msgRegex.test(submitData.message)) errors.message = "Message must be at least 10 characters";

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setError({});
    setLoading(true);

    const formattedMessage = composeMessage(submitData);
    const campaignParams = fetchParams();


    const payload = {
      name: `${submitData.firstName} ${submitData.lastName}`,
      email: submitData.email,
      phone: submitData.contact,
      message: formattedMessage,
      tag: 'vehicle',
      info: { ...submitData, campaign_params: campaignParams || {} }
    };

    const result = await DataSubmittedtoapi(payload);

    if (result?.success) {
      await sendMail({ subject: `Enquiry for ${submitData.firstName}`, text: formattedMessage });
      Tagmanageri([{ pagename: 'vehicle' }], 'new_enquiry');
      resetParams();
      setNotification({ type: "success", text: "Mail sent successfully!" });
      setSubmitData({
        firstName: "", lastName: "", contact: "", email: "", message: "",
        travelSdate: "", travelEdate: "", traveller: "", destination: ""
      });
    } else {
      setNotification({ type: "error", text: "Something went wrong. Please try again later." });
    }

    setLoading(false);
  };

  const closeSidebar = () => {
    setToggle(false);
    setEnquiry(null);
    setNotification({ type: "", text: "" });
    setError({});
  };

  useEffect(() => {
    setSubmitData(prev => ({
      ...prev,
      vehicletype: enquiry?.vehicletype || "",
      vehicleCategory: enquiry?.vehicleCategory || "",
      driveType: enquiry?.driveType || "",
      state: enquiry?.state || "",
      city: enquiry?.city || "",
      pickupLocation: enquiry?.pickupLocation || "",
      travelSdate: enquiry?.startDate || "",
      travelEdate: enquiry?.endDate || "",
      traveller: enquiry?.passengers || "",
      destination: enquiry?.city || ""
    }));

  }, [enquiry])

  return (
    <>
      <div className={toggle ? "sidebar__area active" : "sidebar__area"}>
        <div className="sidebar__main__blk">
          <div className="sidebar__title">
            <h4 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Vehicle Enquiry</h4>
            <h6 onClick={closeSidebar} style={{ cursor: 'pointer', position: 'absolute', right: 10, top: 20, fontSize: '1rem' }}>close</h6>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="sidebar__form__wrap">
              <span className="sidebar__lebel">Primary Guest</span>
              {['firstName', 'lastName', 'contact', 'email'].map(field => (
                <div className="sidebar__form__single" key={field}>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    className={error[field] ? "error" : "dff"}
                    onChange={onChangeHandler}
                    value={submitData[field] || ''}
                  />
                </div>
              ))}
              <div className="sidebar__form__single">
                <label>Message</label>
                <textarea
                  name="message"
                  className={error.message ? "error" : "dff"}
                  placeholder="Enter your message"
                  onChange={onChangeHandler}
                  value={submitData.message}
                  style={{
                    width: '100%',
                    border: "1px solid #C0C0C0",
                    borderRadius: "5px",
                    fontSize: "16px",
                    padding: "10px"
                  }}
                />
              </div>
            </div>

            {Object.values(error).some(msg => msg) && (
              <div className="light-red-div">
                <ul>{Object.entries(error).map(([key, msg]) => msg && <li key={key}>{msg}</li>)}</ul>
              </div>
            )}


            <div className="sidebar__main__btn sidebar2">
              {notification.text && (
                <div style={{ color: notification.type === "success" ? "green" : "red", textAlign: "center" }}>
                  {notification.text}
                </div>
              )}
              <button type="submit" style={{ border: 'none', width: '100%' }} className="common__btn" disabled={loading}>
                {loading ? <span className="spinner-border" role="status" /> : 'Send'}
              </button>


            </div>
          </form>
        </div>
      </div>
      <div className="offcanvas-overlay" onClick={closeSidebar} />
    </>
  );
};

export default memo(Contactform);
