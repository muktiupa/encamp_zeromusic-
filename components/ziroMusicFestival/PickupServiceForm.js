import React, { useState } from 'react';

export default function PickupServiceForm() {
  const [selectedService, setSelectedService] = useState('naharlagun');

  const services = [
    {
      id: 'naharlagun',
      title: 'Naharlagun Railway Station',
      duration: 'approx. 5–6 hrs from Ziro',
      price: '₹ 4000/pax',
      color: 'text-success',
    },
    {
      id: 'guwahati',
      title: 'Guwahati',
      duration: 'approx. ? hrs from Ziro',
      price: '₹ 6000/pax',
      color: 'text-primary',
    },
    {
      id: 'holongi',
      title: 'Holongi Airport',
      duration: 'approx. ? hrs from Ziro',
      price: '₹ 4500/pax',
      color: 'text-success',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You selected: ${selectedService}`);
  };

  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit}>
        <h5>EnCamp’s Pick-up & Drop Services:</h5>
        <div className="row">
          <div className="col-md-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`form-check mb-3 px-2 py-2 rounded border ${
                  selectedService === service.id ? 'border-warning shadow bg-light' : 'bg-white'
                }`}
              >
                <input
                  className="form-check-input p-2 mx-2 my-2"
                  type="radio"
                  name="pickupService"
                  id={service.id}
                  value={service.id}
                  checked={selectedService === service.id}
                  onChange={() => setSelectedService(service.id)}
                />
                <label className="form-check-label" htmlFor={service.id}>
                  <strong>{service.title}</strong> <small>({service.duration})</small>
                  <br />
                  <span className={service.color}>{service.price}</span>
                </label>
              </div>
            ))}
            <button type="submit" className="btn btn-success w-100 mt-3">
              Add Pick up Service
            </button>
          </div>

          <div className="col-md-6">
            {/* Replace with actual Google Map Embed */}
            <div className="ratio ratio-4x3 rounded shadow-sm">
              <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.890432322097!2d93.84114459999999!3d27.565646100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3741671e70b6e9e9%3A0xa2de584632351401!2sZiro%20Festival%20of%20Music!5e1!3m2!1sen!2sin!4v1753877170550!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
