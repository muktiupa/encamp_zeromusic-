import React, { useState, useEffect } from 'react';
import adminapi from '../../api/adminapi';
import { DataSubmittedtoapi } from '../../function/enquiry';
import ReactDOM from "react-dom";

const LockBanner = ({ totalpricetag, data, sendMail, tag }) => {
  const linkedcoupon = data?.[0]?.itineraryindex?.[0]?.commondetails?.linkedCoupons ?? null;
  const [filteredCoupons, setFilteredCoupons] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // States for modal and form submission
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEnquired, setIsEnquired] = useState(false);
  const [isOnceOpen, setIsOnceOpen] = useState(false);

  const createLinkurl = () => {
    const itinerary = data?.[0];
    if (!itinerary) return "";
    const namecv = itinerary.itineraryindex?.[0]?.nameite;
    const nameurl = namecv ? namecv.replace(/\s+/g, "-").toLowerCase() : "itinerary";
    return `/itinerary/${nameurl}/${itinerary._id}`;
  };
  useEffect(() => {
    if (!document.getElementById("modal-root")) {
      const modalDiv = document.createElement("div");
      modalDiv.id = "modal-root";
      document.body.appendChild(modalDiv);
    }
  }, []);
  
  useEffect(() => {
  const storedLocks = JSON.parse(localStorage.getItem('lockPrice')) || [];
  const currentDate = new Date();

  if (data?.[0]?._id) {
    const existingLock = storedLocks.find(lock => lock.itineraryId === data[0]._id);

    if (existingLock) {
      const expiryDate = new Date(existingLock.expiryDate);
      const lockExpiryTime = new Date(existingLock.lockExpiryTime);

      // Check if either expiryDate or lockExpiryTime is expired
      if (expiryDate < currentDate || lockExpiryTime < currentDate) {
        // Remove expired itinerary from storedLocks
        const updatedLocks = storedLocks.filter(lock => lock.itineraryId !== data[0]._id);
        // Update localStorage
        localStorage.setItem('lockPrice', JSON.stringify(updatedLocks));
      } else {
        setIsEnquired(true);
      }
    }
  }
}, [data]);

  
  
  const getLinkedCoupon = async (couponId) => {
    try {
      const response = await adminapi.get(`/activecouponsbyid/${couponId.toString()}`);
      if (response.data) {
        const coupons = response.data;
        const validCoupon = coupons.find(item =>
          item.lockedpriceenabled === true &&
          item.expiryDate &&
          new Date(item.expiryDate) >= new Date()
        );

        setFilteredCoupons(validCoupon ?? null);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  useEffect(() => {
    if (linkedcoupon) {
      getLinkedCoupon(linkedcoupon);
    }
  }, [linkedcoupon]);

/*   useEffect(() => {
    if (filteredCoupons && filteredCoupons.expiryDate) {
      const expiryTime = new Date(filteredCoupons.expiryDate).getTime();
      const now = Date.now();
      const secondsLeft = Math.max(0, Math.floor((expiryTime - now) / 1000));
      setTimeLeft(secondsLeft);
    }
  }, [filteredCoupons]); */
  useEffect(() => {
    if (filteredCoupons?.lockInPeriod) {
      const [hours, minutes] = filteredCoupons.lockInPeriod.split(":").map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const lockinPeriodInSeconds = hours * 3600 + minutes * 60;
        setTimeLeft(Math.max(0, lockinPeriodInSeconds));
      } else {
        console.error("Invalid lockinPeriod format:", filteredCoupons.lockInPeriod);
        setTimeLeft(0);
      }
    }
  }, [filteredCoupons]);



  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // If already enquired (locked), hide the section.
  if (isEnquired) {
    return null;
  }

  // --- Discount Calculation ---
  let discountAmount = 0;
  if (!filteredCoupons) {
    return null;
  }

  if (filteredCoupons.discountType === 'percentage') {
    const calculatedDiscount = (totalpricetag.value * filteredCoupons.discountValue) / 100;
    discountAmount =
      filteredCoupons.maxDiscountAmount && calculatedDiscount > filteredCoupons.maxDiscountAmount
        ? filteredCoupons.maxDiscountAmount
        : calculatedDiscount;
  } else {
    discountAmount = filteredCoupons.discountValue;
  }
  const finalPrice = totalpricetag.value - discountAmount;

  // --- Format Time into D:HH:MM:SS ---
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = secs.toString().padStart(2, '0');
    return `${days}:${hoursStr}:${minutesStr}:${secondsStr}`;
  };

  // --- Validation and Compose Message Functions ---
  const validateName = (name) => {
    if (!name || name.trim() === '') return 'Name is required';
    return '';
  };
  const validateContact = (contact) => {
    if (!contact || contact.trim() === '') return 'Contact number is required';
    return '';
  };
  const composeMessage = (data) => {
    return ` ${data.name}. has locked an Itineary ${createLinkurl()}.  at ${finalPrice}.Contact: ${data.contact}. Email: ${data.email}.`;
  };

  // --- Modal Handlers ---
  const handleLockPrice = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    const nameError = validateName(formData.name);
    const contactError = validateContact(formData.contact);
    const itineraryId = data?.[0]?._id ?? null;
    if (nameError || contactError) {
      setErrors({ name: nameError, contact: contactError });
      return;
    }
    setLoading(true);
    console.log("Form submitted:", formData);
    const message = composeMessage(formData);
    const uploaddata = {
      name: formData.name,
      email: formData.email,
      phone: formData.contact,
      message: message,
      url: createLinkurl(),
      tag: `Locked-Price-${tag ?? ''}`,
      info: formData,
    };
    let dataSubmitted = await DataSubmittedtoapi(uploaddata);
    if (dataSubmitted && dataSubmitted.success === true) {
      try {
        let maildata = { subject: 'Locked-Price Intimation', text: message };
        let mailresponse = await sendMail(maildata);
        if (mailresponse) {
          console.log('Mail has been sent');
        } else {
          console.log('Mail server error');
        }
      } catch (e) {
        console.log("Mail Sending Failed", e);
      }
      setIsEnquired(true);
      // Save lock details to localStorage as an array
      const couponCode = filteredCoupons.code;
      const couponId = filteredCoupons._id;
      const lockedPrice = finalPrice;
      const lockExpiryTime = new Date(Date.now() + timeLeft * 1000);
      const lockDetails = {
        couponCode,
        couponId,
        lockedPrice,
        actualprice: totalpricetag.value,
        discountType: filteredCoupons.discountType,
        discountValue: filteredCoupons.discountValue,
        itineraryId,
        expiryDate: filteredCoupons.expiryDate,
        lockExpiryTime,
        tag: tag ?? "",
        url: createLinkurl(),
      };

      const existingData = JSON.parse(localStorage.getItem('lockPrice')) || [];
      existingData.push(lockDetails);
      localStorage.setItem('lockPrice', JSON.stringify(existingData));
      console.log("Lock details saved to localStorage:", lockDetails);
      setLoading(false);
      setIsOnceOpen(true);
      setShowConfirmation(true); // Ensure this is being called
      console.log("Confirmation modal should be visible");
      setShowModal(false);
      setTimeout(() => {
        window.location.reload();
      }
        , 2000);
    } else {
      setLoading(false);
    }
  };

  const handleConfirmDismiss = () => {
    setShowConfirmation(false);
    setTimeout(() => {
      window.location.reload(); // Refresh the page after a short delay
    }, 1000); // Adjust the delay as needed
  };
  return (
    <div className="p-2 bg-warning text-dark rounded text-center">
      <h4 style={{ fontSize: "1.2rem" }}>
        Lock Your Price Now &amp; Pay{" "}
        {filteredCoupons.discountType === "percentage"
          ? `${filteredCoupons.discountValue}%`
          : `INR ${filteredCoupons.discountValue}`}{" "}
        Less
      </h4>
      <p style={{ fontSize: "0.8rem", fontWeight: "800", marginTop: "-10px" }}>
        You can lock the price now &amp; decide later. No charges apply.
      </p>
      <h2 style={{ fontSize: "1.4rem", marginTop: "-10px" }}>
        {formatTime(timeLeft)}
      </h2>
      <button className="btn btn-dark w-100" onClick={handleLockPrice}>
        INR {finalPrice.toLocaleString()} Lock The Price
      </button>

      {/* Modal for collecting customer details */}
      {showModal &&
        !isOnceOpen &&
        ReactDOM.createPortal(
          <div style={modalOverlayStyle}>
            <div style={modalStyle}>
              <h3 style={{ fontSize: "1.8rem" }}>Enter your details</h3>
              <form onSubmit={handleModalSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <input
                  type="tel"
                  name="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                {errors.contact && (
                  <p style={{ color: "red" }}>{errors.contact}</p>
                )}
                <button
                  type="submit"
                  style={submitButtonStyle}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={cancelButtonStyle}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}

      {/* Confirmation modal */}
      {showConfirmation &&
        isOnceOpen &&
        ReactDOM.createPortal(
          <div style={modalOverlayStyle}>
            <div style={modalStyle}>
              <h3 style={{ fontSize: "1.8rem" }}>Price Locked!</h3>
              <p>
                Your price is locked at INR {finalPrice.toLocaleString()} and is
                valid till {formatTime(timeLeft)}
              </p>
              <button onClick={handleConfirmDismiss} style={submitButtonStyle}>
                OK
              </button>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </div>
  );
};

// Inline styles for basic modals (adjust or replace with your UI library)
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '400px',
  width: '90%',
  textAlign: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const submitButtonStyle = {
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  borderRadius: '4px',
  background: '#28a745',
  color: '#fff',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  borderRadius: '4px',
  background: '#dc3545',
  color: '#fff',
  cursor: 'pointer',
};

export default LockBanner;