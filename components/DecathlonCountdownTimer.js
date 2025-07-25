import { useState, useEffect } from "react";

const DecathlonCountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const difference = lastDayOfMonth - now;

      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderTimer = () => {
    return (
      <>
        {timeLeft.days !== undefined ? (
          <>
            <span>{timeLeft.days}d </span>
            <span>{timeLeft.hours}h </span>
            <span>{timeLeft.minutes}m </span>
            <span>{timeLeft.seconds}s</span>
          </>
        ) : (
          <span>Offer expired</span>
        )}
      </>
    );
  };

  return (
    <div className="bg-yellow-500 text-white py-16 mt-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Exclusive 10% Discount Ends In
        </h2>
        <div id="countdown" className="text-4xl font-bold">
          {renderTimer()}
        </div>
        <button
          onClick={() =>
            document
              .getElementById("booking-form")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="mt-6 bg-white text-blue-500 py-3 px-6 rounded hover:bg-gray-100 transition duration-300"
        >
          Claim Your Discount
        </button>
        <p className="mt-4 text-white">
          Offer valid with proof of purchase from Decathlon within the last 30
          days.
        </p>
      </div>
    </div>
  );
};

export default DecathlonCountdownTimer;
