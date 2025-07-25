import DecathlonCountdownTimer from "../components/DecathlonCountdownTimer";

const CountdownTimerSection = () => {
  return (
    <div className="bg-yellow-500 text-white py-16 mt-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Exclusive 10% Discount Ends In
        </h2>
        <div id="countdown" className="text-4xl font-bold">
          <DecathlonCountdownTimer />
        </div>
        <button className="mt-6 bg-white text-blue-500 py-3 px-6 rounded hover:bg-gray-100 transition duration-300">
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

export default CountdownTimerSection;
