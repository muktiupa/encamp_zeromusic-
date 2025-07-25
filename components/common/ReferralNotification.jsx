import React, { useState, useEffect } from "react";

function ReferralNotification() {
  // State to hold the lock details from localStorage (assumed to be saved as an array)
  const [lockDetails, setLockDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // Function to format seconds into D:HH:MM:SS
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
  
    let formattedTime = "";
  
    if (days > 0) formattedTime += `${days} Day${days > 1 ? 's' : ''} `;
    if (hours > 0) formattedTime += `${hours} Hr${hours > 1 ? 's' : ''} `;
    if (minutes > 0) formattedTime += `${minutes} Min `;
    if (secs > 0) formattedTime += `${secs} Sec`;
  
    return formattedTime.trim(); // Remove trailing spaces
  };

  // On mount, retrieve lock details from localStorage and choose a valid one (if any)
  useEffect(() => {
    const storedLocks = JSON.parse(localStorage.getItem("lockPrice")) || [];
 
    const validLocks = storedLocks.filter((lock) => {
      const expiryTime = new Date(lock.lockExpiryTime).getTime();
      return expiryTime > Date.now();
  });
 

  
    if (validLocks.length > 0) {
      // You can choose the first valid lock or add your own logic if multiple exist.
      setLockDetails(validLocks[0]);
    }
  }, []);

  // Set up a countdown timer based on lockDetails.expiryDate
  useEffect(() => {
    if (lockDetails?.expiryDate) {
      const expiryTime = new Date(lockDetails.lockExpiryTime).getTime();
      const updateTimer = () => {
        const secondsLeft = Math.max(0, Math.floor((expiryTime  - Date.now()) / 1000));
        setTimeLeft(secondsLeft);
      };
      updateTimer(); // initial calculation
      const timerInterval = setInterval(updateTimer, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [lockDetails]);

  // If no valid lock details exist, hide the referral notification section.
  if (!lockDetails || lockDetails.length === 0) {
    return null;
  }


  return (
    <div>
      {/* Top Notification Bar */}
      <div style={topBarStyle}>
        <div>
          <strong> Locked Offer:</strong>{" "}
          Your price is locked at INR {lockDetails.lockedPrice.toLocaleString()} . Valid for: {formatTime(timeLeft)}
        </div>
        <button
          className="btn btn-sm"
          style={claimButtonStyle}
          onClick={() => window.location.href = lockDetails.url}
        >
          Claim
        </button>
      </div>
    </div>
  );
}

// Inline styles for the notification bar and button (customize as needed)
const topBarStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 5,
  backgroundColor: "#ffca28b5", // Bright yellow
  color: "#000",
  padding: "0.1rem 0.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "left",
  fontSize:"0.8rem"
};

const claimButtonStyle = {
  backgroundColor: "#202020",
  color: "#fff",
  border: "none",
  padding: "0.5rem 1rem",
  cursor: "pointer",
};

export default ReferralNotification;
