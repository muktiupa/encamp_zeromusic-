import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const packageData = [
  {
    id: 1,
    title: '4 Nights & 5 Days Package',
    price: 1500,
    oldPrice: 2000,
    location: 'Ziro, Arunachal Pradesh',
  },
  {
    id: 2,
    title: '2 Nights & 3 Days Package',
    price: 1000,
    oldPrice: 1300,
    location: 'Ziro, Arunachal Pradesh',
  },
  {
    id: 3,
    title: '5 Nights & 6 Days Package',
    price: 1800,
    oldPrice: 2300,
    location: 'Ziro, Arunachal Pradesh',
  },
];

export default function ZiroFestivalBasecamp() {
  const [selectedPackage, setSelectedPackage] = useState(packageData[0]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-2">EnCamp’s Ziro Festival Basecamp!</h2>
      <p className="text-center fst-italic text-muted mb-4">
        ZFM 2025 Camping Packages <br /> <span className="text-success">Camp Easy. Party Hard.</span>
      </p>

      {/* Main Two Column Layout */}
      <div className="row">
        {/* Left Column */}
        <div className="col-md-6">
          {/* Package selection */}
          <div className="d-flex flex-wrap gap-3 mb-4">
            {packageData.map((pkg) => (
              <button
                key={pkg.id}
                className={`btn btn-outline-secondary bg-light w-25 text-secondary ${selectedPackage.id === pkg.id ? 'border border-success border-3' : ''}`}
                onClick={() => setSelectedPackage(pkg)}
              >
                {pkg.title}
              </button>
            ))}
          </div>

          {/* Image section */}
          <div className="row">
            <div className="col-12 mb-3">
              <img src="/images/ziro1.jpg" alt="Main field" className="img-fluid rounded" />
            </div>
            <div className="col-6 mb-3">
              <img src="/images/ziro2.jpg" alt="Stage" className="img-fluid rounded" />
            </div>
            <div className="col-6 mb-3">
              <img src="/images/ziro3.jpg" alt="Tents" className="img-fluid rounded" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          {/* Booking Card */}
         <div className="col-8 m-4">
  {/* Booking Card */}
            <div className="justify-content-center">
  <div className="card p-4 mb-4 shadow position-relative">

    {/* 🔴 Red Price Strip */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '6px 12px',
        fontSize: '20px',
        borderBottomLeftRadius: '5px',
        zIndex: 1,
        textAlign: 'right',
        lineHeight: '1.2',
        width:'150px',
      }}
    >
      <div>
        <del>₹{selectedPackage.oldPrice}/pax</del><br />
        <strong>₹{selectedPackage.price}/pax</strong>
      </div>
    </div>
    <h5 className="mb-3">Package Details</h5>

    {/* 🟡 Yellow Note */}
    <div
      style={{
        backgroundColor: '#fff3cd',
        color: '#856404',
        borderRadius: '6px',
        padding: '8px 12px',
        fontSize: '14px',
        marginBottom: '16px',
      }}
    >
      <strong>Note:</strong> prices are subject to rise as tent availability drops
    </div>

    {/* 📦 Package Details */}
    
    <ul>
      <li>Twin Sharing Dome Tent Stay</li>
      <li>Complimentary Breakfast</li>
      <li>Campsite Facilities</li>
    </ul>

    {/* 📍 Location */}
    <p className="mb-1">
      <i className="bi bi-geo-alt"></i> {selectedPackage.location}
    </p>

    {/* ✅ Buttons */}
    <button className="btn btn-success w-100 my-2">Book Now</button>
    <button className="btn btn-warning w-100">Enquire Now</button>
  </div>
</div>





</div>


          {/* Description Section */}
          <div className="bg-light p-4 rounded">
            <p>
              While the festival music keeps you grooving, your abode should certainly be a place of utmost comfort.
              And that’s what we are offering you at Encamp Ziro.
            </p>
            <p>
              Lounge back and catch up with your friends and tent mates in the bamboo machang under ten million stars,
              or jam the night away and welcome the dawn by the bonfire OR simply snooze off after a heavy day of
              blissful experiences and take the morning nature walk.
            </p>
            <p>
              The choice is yours to explore once you’re there. But don’t miss our deal, coz it’s really a steal! We bet
              you’ll get any other camping experience as Encamp at the price we are offering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
